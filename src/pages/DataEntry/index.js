import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { SinglePage } from '../../components';

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import StartForm from './StartForm';
import EndMessage from './EndMessage';
import CommentForm from './CommentForm';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

import { postForm } from '../../actions/postForm';
import { getQuestions } from '../../actions/getQuestions';

const styles = theme => ({
  container: theme.mixins.gutters({
    paddingTop: 18,
    paddingBottom: 18
  }),
  progressText: {
    padding: '0 24px'
  }
});

const mapStateToProps = state => ({
  questions: state.questions
});

class DataEntry extends React.Component {

  state = {
    activeStep: 0,
    startTime: 0,
    steps: null,
    data: null
  }

  componentDidMount () {
    this.props.dispatch(getQuestions());
  }

  componentWillReceiveProps (props) {
    let { questions } = props.questions;
    if (questions && !this.props.questions.questions) {
      this.setState({
        startTime: +moment().format('x'),
        steps: [
          { type: 'start-form' },
          ...questions,
          { type: 'comment' },
          { type: 'end-message' }
        ],
        data: [
          {
            type: 'start-form',
            email: null,
            age: null,
            gender: null,
            educationLevel: null,
            completionTime: 0
          },
          ...questions.map(question => ({
            id: question.id,
            answer: null,
            isCorrect: false,
            completionTime: 0
          })),
          {
            type: 'comment',
            comment: null,
            completionTime: 0
          }
        ]
      });
    }
  }

  handleNext () {
    this.setState({
      activeStep: this.state.activeStep + 1,
      data: this.state.data.map((data, index) => index === this.state.activeStep ? { ...data, completionTime: +moment().format('x') } : data)
    }, () => {
      if (this.state.steps[this.state.activeStep].type === 'end-message') {
        let lastCompletionTime = this.state.data[0].completionTime;
        let data = {
          email: this.state.data[0].email,
          age: this.state.data[0].age,
          gender: this.state.data[0].gender,
          educationLevel: this.state.data[0].educationLevel,
          comment: this.state.data[this.state.data.length-1].comment,
          questions: this.state.data.filter(data => data.id).map((data, index) => {
            let question = {
              ...data,
              completionTime: (data.completionTime - lastCompletionTime) / 1000
            };
            lastCompletionTime = data.completionTime;
            return question;
          })
        };
        this.props.dispatch(postForm(data));
      }
    });
  }

  isNextActive () {
    let { activeStep, steps } = this.state;
    return activeStep < steps.length - 1;
  }

  handleSubmitStep (stepData) {
    let { data, activeStep } = this.state;
    data[activeStep] = { ...data[activeStep], ...stepData };
    this.setState({ data });
  }

  renderStep () {
    let { activeStep, steps } = this.state;
    switch (steps[activeStep].type) {
      case 'start-form':
        return <StartForm
          onSubmit={ this.handleSubmitStep.bind(this) }
        />;
      
      case 'multiple-choice-question':
        return <MultipleChoiceQuestion
          data={ steps[activeStep] }
          onSubmit={ this.handleSubmitStep.bind(this) }
        />;

      case 'comment':
        return <CommentForm
          onSubmit={ this.handleSubmitStep.bind(this) }
        />;
      
      case 'end-message':
        return <EndMessage />;
      
      default: return null;
    }
  }

  render () {

    let { classes } = this.props;
    let { activeStep, data, steps } = this.state;
    let { questions } = this.props.questions;

    if (!steps) {
      return (
        <SinglePage>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <CircularProgress size={ 100 } />
          </div>
        </SinglePage>
      );
    }
    
    return (
      <SinglePage>

        <div className={ classes.container }>
          { this.renderStep() }
        </div>

        { activeStep < steps.length - 1 ?
          <MobileStepper
            type={ data[activeStep].id ? 'progress' : 'text' }
            steps={ steps.length }
            position="static"
            activeStep={ activeStep }
            nextButton={
              <Button dense
                color="primary"
                onClick={ this.handleNext.bind(this) }
                disabled={ !this.isNextActive() }
              >
                { data[activeStep].answer || !data[activeStep].id ? 'Siguiente' : 'Omitir' }
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Typography type="button" className={ classes.progressText }>
                { activeStep > 0 && activeStep <= questions.length ? `${ activeStep }/${ questions.length }` : '' }
              </Typography>
            }
          />
        : null }
      
      </SinglePage>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(DataEntry))
