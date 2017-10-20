import React from 'react';
import color from 'color';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';
import { colors } from '../../../conventions';

import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Slider from 'rc-slider';

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
    flex: 0,
    marginLeft: 12
  },
  progress: {
    flex: 1,
    marginRight: 12,
    opacity: .7
  },
  progressBar: {
    borderRadius: 3,
    width: '100%',
    height: 12,
    backgroundColor: colors.text[200],
    boxShadow: `1px 1px 5px 1px ${ colors.text[300] }`,
    overflow: 'hidden'
  },
  progressValue: {
    width: 0,
    height: '100%',
    transition: 'width .4s linear',
    background: `linear-gradient(45deg, ${ colors.primary['A200'] } 30%, ${ colors.secondary['A200'] } 90%)`,
    boxShadow: `2px 0 5px 2px ${ color(colors.secondary['A200']).fade(0.7) }`
  },
  answerContainer: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    flexWrap: 'wrap'
  },
  fractionContainer: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 24,
    margin: '12px 0',
    flexWrap: 'wrap'
  },
  fractionValue: {
    flex: 0,
    minWidth: 32,
    border: `2px solid ${ colors.text[800] }`
  },
  fractionValueDivider: {
    borderTop: `2px solid ${ colors.text[800] }`,
    height: 1
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
    questions: [],

    fraction1: '',
    fraction2: ''
  }

  componentDidMount () {
    this.setState({ startTime: +moment().format('x') });
  }

  handleAnswer (event, answer) {
    this.setState({ answer });
  }

  handleChangeFraction1 (value) {
    this.setState({
      fraction1: value,
      answer: `${ value }/${ this.state.fraction2 }`
    });
  }

  handleChangeFraction2 (value) {
    this.setState({
      fraction2: value,
      answer: `${ this.state.fraction1 }/${ value }`
    });
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

  renderMultipleChoiceOptions (options) {
    return options.map((option, index) => (
      <FormControlLabel
        key={ index } label={ option } value={ option } control={ <Radio /> }
        classes={{ label: this.props.classes.optionLabel }}
      />
    ));
  }

  renderMultipleChoice (question) {
    return (
      <div className={ this.props.classes.answerContainer }>

        { question.image ?
          <div style={{ flex: 0, marginRight: 24, marginBottom: 12, textAlign: 'center' }}>
            <img src={ question.image } alt={ question.label } /> 
          </div>
        : null }

        <div style={{ flex: 1 }}>
          <FormControl component="fieldset">
            <RadioGroup name="question" value={ this.state.answer } onChange={ this.handleAnswer.bind(this) }>
              { this.renderMultipleChoiceOptions(question.options) }
            </RadioGroup>
          </FormControl>
        </div>

      </div>
    );
  }

  renderScale (question) {
    return (
      <div style={{ flex: 0, padding: '0 24px' }}>
        <Slider
          step={ 1 } min={ 0 } max={ 10 }
          defaultValue={ 5 }
          marks={{ 0: '0', 2: '', 4: '', 6: '', 8: '', 10: '10' }}
          onAfterChange={ value => this.handleAnswer(null, value) }
          trackStyle={{ backgroundColor: colors.primary['A200'] }}
          handleStyle={{ borderColor: colors.primary['A200'], backgroundColor: '#FFF', boxShadow: 'none' }}
          railStyle={{ backgroundColor: colors.primary['A200'] }}
          dotStyle={{ borderColor: colors.primary['A200'], backgroundColor: colors.primary['A200'] }}
        />
      </div>
    );
  }

  renderFraction (question) {
    return (
      <div className={ this.props.classes.fractionContainer }>

        <div style={{ flex: 0, marginRight: 48, textAlign: 'center' }}>
          <img src={ question.image } alt={ question.label } width={ 200 } /> 
        </div>

        <div className={ this.props.classes.fractionValue }>
          <TextField fullWidth
            type="number"
            value={ this.state.fraction1 }
            onChange={ e => this.handleChangeFraction1(e.target.value) }
          />
          <div className={ this.props.classes.fractionValueDivider } />
          <TextField fullWidth
            type="number"
            value={ this.state.fraction2 }
            onChange={ e => this.handleChangeFraction2(e.target.value) }
          />
        </div>

      </div>
    );
  }

  renderQuestion (question) {
    switch (question.type) {
      case 'multiple-choice-question': return this.renderMultipleChoice(question);
      case 'scale-question': return this.renderScale(question);
      case 'fraction-question': return this.renderFraction(question);
      default: return null;
    }
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

        { this.renderQuestion(question) }

        <div className={ classes.footer }>
          <div className={ classes.progress }>
            <div className={ classes.progressBar }>
              <div
                className={ classes.progressValue }
                style={{ width: `${ ((currentQuestion + 1) / questions.length) * 100 }%` }}
              />
            </div>
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
