import React from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';
import { colors } from '../../../conventions';

import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  container: {
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  question: {
    fontSize: 26,
    marginBottom: 16,
    fontWeight: 400,
    flex: 0,
    lineHeight: 1.3
  },
  footer: {
    flex: 0,
    display: 'flex',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    flex: 0
  },
  progress: {
    flex: 0
  },
  progressLabel: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: 24,
    backgroundColor: colors.primary[500],
    color: '#FFF',
    fontWeight: 300
  },
  answerContainer: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    flexWrap: 'wrap'
  },
  optionLabel: {
    fontSize: 24,
    position: 'relative',
    top: -1
  }
});

class QuestionsStep extends React.Component {

  state = {
    startTime: 0,
    currentQuestion: 0,
    answer: null,
    questions: []
  }

  componentDidMount () {
    this.setState({ startTime: +moment().format('x') });
  }

  handleAnswer (event, answer) {
    this.setState({ answer });
  }

  handleNext (event) {
    event.preventDefault();
    let { currentQuestion, questions, answer } = this.state;
    let question = this.props.questions[currentQuestion];
    this.setState({
      questions: [
        ...questions,
        {
          id: question.id,
          answer: answer,
          isCorrect: question.correctAnswer === answer,
          completionTime: +moment().format('x')
        }
      ],
      currentQuestion: currentQuestion + 1,
      answer: null
    }, () => {
      if (this.state.currentQuestion === this.props.questions.length) {
        let lastCompletionTime = this.state.startTime;
        this.props.onSubmit(this.state.questions.map(question => {
          let q = {
            ...question,
            completionTime: (question.completionTime - lastCompletionTime) / 1000
          };
          lastCompletionTime = question.completionTime;
          return q;
        }));
      }
    });
  }

  renderOptions (options) {
    return options.map((option, index) => (
      <FormControlLabel
        key={ index } label={ option } value={ option } control={ <Radio /> }
        classes={{ label: this.props.classes.optionLabel }}
      />
    ));
  }

  render () {

    let { classes, questions } = this.props;
    let { currentQuestion, answer } = this.state;
    
    let question = questions[currentQuestion];
    if (!question) return null;
    
    return (
      <form onSubmit={ this.handleNext.bind(this) } className={ classes.container }>

        <Typography type="title" className={ classes.question }>
          { question.label }
        </Typography>

        <div className={ classes.answerContainer }>

          { question.image ?
            <div style={{ flex: 0, marginRight: 24, marginBottom: 12, textAlign: 'center' }}>
              <img src={ question.image } alt={ question.label } /> 
            </div>
          : null }

          <div style={{ flex: 1 }}>
            <FormControl component="fieldset">
              <RadioGroup name="question" value={ answer } onChange={ this.handleAnswer.bind(this) }>
                { this.renderOptions(question.options) }
              </RadioGroup>
            </FormControl>
          </div>

        </div>

        <div className={ classes.footer }>
          <div className={ classes.progress }>
            <span className={ classes.progressLabel }>
              { `${ currentQuestion + 1 }/${ questions.length }` }
            </span>
          </div>
          <div className={ classes.button }>
            <RaisedButton
              type="submit"
              icon="chevron_right"
              label={ answer ? 'Siguiente' : 'Omitir' }
              style={{ minWidth: '160px' }}
            />
          </div>
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(QuestionsStep);
