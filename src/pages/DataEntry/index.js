import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { SinglePage } from '../../components';
import { WelcomeStep, ProfileStep, QuestionsStep, CommentStep, EndStep } from './components';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import { fetchQuestions, createForm, updateForm } from '../../actions';

const styles = theme => ({});

const mapStateToProps = state => ({
  questions: state.questions.questions,
  dataEntry: state.dataEntry
});

class DataEntry extends React.Component {

  steps = [
    'welcome',
    'profile',
    'questions',
    'comment',
    'end'
  ]

  state = {
    step: 0,
    score: 0,
    answeredQuestions: 0,
    error: null
  }

  componentDidMount () {
    this.props.dispatch(fetchQuestions());
  }

  componentWillReceiveProps (props) {
    if (props.dataEntry.success && !this.props.dataEntry.success) {
      if (this.steps[this.state.step] !== 'questions' || this.state.answeredQuestions === this.props.questions.length) {
        this.handleNext();
      }
    }
    if (props.dataEntry.didInvalidate && !this.props.dataEntry.didInvalidate) {
      if (this.steps[this.state.step] !== 'profile') {
        this.setState({
          error: 'Error al enviar el formulario, por favor reintente'
        });
      } else {
        this.setState({
          error: 'Ya existe un formulario registrado con esta dirección de email'
        });
      }
    }
  }

  handleNext () {
    this.setState({ step: this.state.step + 1 });
  }

  handleProfile (profile) {
    this.props.dispatch(createForm(profile));
  }

  handleQuestion (question) {
    this.setState({
      score: this.state.score + (question.isCorrect ? 1 : 0),
      answeredQuestions: this.state.answeredQuestions + 1
    }, () => {
      this.props.dispatch(updateForm({ question }));
    });
  }

  handleComment ({ comment, triedMoravec }) {
    this.props.dispatch(updateForm({ comment, triedMoravec, finished: true }));
  }

  renderStep () {

    let { step, score, answeredQuestions } = this.state;
    let { questions, dataEntry: { isFetching, success } } = this.props;
    
    switch (this.steps[step]) {
      
      case 'welcome':
        return <WelcomeStep onSubmit={ this.handleNext.bind(this) } />;
      
      case 'profile':
        return <ProfileStep onSubmit={ this.handleProfile.bind(this) } isFetching={ isFetching } />;
      
      case 'questions':
        return <QuestionsStep questions={ questions } onSubmit={ this.handleQuestion.bind(this) } isFetching={ isFetching } submitSuccess={ success } />;

      case 'comment':
        return <CommentStep onSubmit={ this.handleComment.bind(this) } isFetching={ isFetching } />;

      case 'end':
        return <EndStep score={ score } questionsCount={ answeredQuestions } />;
      
      default: return null;
    
    }

  }

  render () {

    let { questions } = this.props;

    if (!questions) {
      return (
        <SinglePage align="center" style={{ padding: 48 }}>
          <CircularProgress size={ 100 } />
        </SinglePage>
      );
    }
    
    return (
      <div>

        <SinglePage>
          { this.renderStep() }
        </SinglePage>
      
        <Dialog open={ !!this.state.error } onRequestClose={ () => this.setState({ error: null }) }>
          <DialogTitle>{ this.state.error }</DialogTitle>
          <DialogActions>
            <Button onClick={ () => this.setState({ error: null }) } color="primary" autoFocus>ok</Button>
          </DialogActions>
        </Dialog>

      </div>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(DataEntry));
