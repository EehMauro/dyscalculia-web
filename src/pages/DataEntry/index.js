import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { SinglePage } from '../../components';
import { WelcomeStep, ProfileStep, QuestionsStep, CommentStep, EndStep } from './components';
import { CircularProgress } from 'material-ui/Progress';
import { postForm } from '../../actions/postForm';
import { getQuestions } from '../../actions/getQuestions';

const styles = theme => ({});

const mapStateToProps = state => ({
  questions: state.questions.questions
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
    form: {}
  }

  componentDidMount () {
    this.props.dispatch(getQuestions());
  }

  handleNext () {
    this.setState({ step: this.state.step + 1 }, () => {
      if (this.steps[this.state.step] === 'end') {
        this.props.dispatch(postForm(this.state.form));
      }
    });
  }

  handleProfile (profile) {
    this.setState({ form: { ...this.state.form, ...profile } });
    this.handleNext();
  }

  handleQuestions (questions) {
    this.setState({ form: { ...this.state.form, questions } });
    this.handleNext();
  }

  handleComment (comment) {
    this.setState({ form: { ...this.state.form, comment } });
    this.handleNext();
  }

  renderStep () {

    let { step } = this.state;
    let { questions } = this.props;
    
    switch (this.steps[step]) {
      
      case 'welcome':
        return <WelcomeStep onSubmit={ this.handleNext.bind(this) } />;
      
      case 'profile':
        return <ProfileStep onSubmit={ this.handleProfile.bind(this) } />;
      
      case 'questions':
        return <QuestionsStep questions={ questions } onSubmit={ this.handleQuestions.bind(this) } />;

      case 'comment':
        return <CommentStep onSubmit={ this.handleComment.bind(this) } />;

      case 'end':
        return <EndStep score={ this.state.form.questions.filter(q => q.isCorrect).length } questionsCount={ questions.length } />;
      
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
      <SinglePage>
        { this.renderStep() }
      </SinglePage>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(DataEntry));
