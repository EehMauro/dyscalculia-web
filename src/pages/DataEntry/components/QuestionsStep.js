import React from 'react';
import color from 'color';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';
import { colors } from '../../../conventions';

import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Slider from 'rc-slider';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  question: {
    fontSize: 26,
    marginBottom: 16,
    fontWeight: 400,
    lineHeight: 1.3,
    '@media only screen and (max-width : 960px)': {
      fontSize: 20
    }
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
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    flexWrap: 'wrap'
  },
  visuospatialContainer: {
    padding: 24,
    margin: '12px 0 0'
  },
  optionLabel: {
    fontSize: 24,
    position: 'relative',
    top: -1,
    '@media only screen and (max-width : 960px)': {
      fontSize: 20
    }
  }
});

class QuestionsStep extends React.Component {

  state = {
    currentTime: 0,
    currentQuestion: 0,
    answer: null
  }

  componentDidMount () {
    this.setState({ currentTime: +moment().format('x') });
  }

  componentWillReceiveProps (props) {
    if (props.submitSuccess && !this.props.submitSuccess) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        currentTime: +moment().format('x'),
        answer: null
      });
    }
  }

  handleAnswer (event, answer) {
    this.setState({ answer });
  }

  isAnswerCorrect (question, answer) {
    if (question.type !== 'scale-question') return question.correctAnswer === answer;
    return answer >= question.correctAnswer - 5 && answer <= question.correctAnswer + 5;
  }

  handleNext (event) {
    event.preventDefault();

    let { currentQuestion, answer } = this.state;
    let question = this.props.questions[currentQuestion];

    let lastTime = this.state.currentTime;
    let currentTime = +moment().format('x');

    this.props.onSubmit({
      id: question.id,
      answer: answer,
      isCorrect: this.isAnswerCorrect(question, answer),
      completionTime: currentTime - lastTime
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
      <div style={{ flex: 1 }}>

        <Typography type="title" className={ this.props.classes.question }>
          { question.label }
        </Typography>

        <div className={ this.props.classes.answerContainer }>

          { question.image ?
            <div style={{ flex: 0, marginRight: 24, marginBottom: 12, textAlign: 'center' }}>
              <img src={ question.image } alt={ question.label } width={ 280 } /> 
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

      </div>
    );
  }

  renderScale (question) {
    return (
      <div style={{ flex: 1 }}>

        <Typography type="title" className={ this.props.classes.question }>
          { question.label }
        </Typography>

        <div style={{ flex: 0, padding: '48px 24px 64px' }}>
          <Slider
            step={ 1 } min={ 0 } max={ 100 }
            defaultValue={ 50 }
            marks={{
              0: {
                style: { fontSize: 16, color: colors.text[700], marginTop: 10, fontWeight: 600 },
                label: '0'
              },
              25: '',
              50: '',
              75: '',
              100: {
                style: { fontSize: 16, color: colors.text[700], marginTop: 10, fontWeight: 600 },
                label: '100'
              },
            }}
            onAfterChange={ value => this.handleAnswer(null, value) }
            trackStyle={{
              backgroundColor: colors.secondary['A200']
            }}
            handleStyle={{
              borderColor: colors.secondary['A200'],
              backgroundColor: '#FFF',
              boxShadow: 'none',
              width: 30, height: 30,
              marginLeft: -15, marginTop: -13,
              borderWidth: 4
            }}
            railStyle={{
              backgroundColor: colors.secondary['A200']
            }}
            dotStyle={{
              borderColor: colors.secondary['A200'],
              backgroundColor: colors.secondary['A200']
            }}
          />
        </div>

      </div>
    );
  }

  renderVisuospatial (question) {
    return (
      <div style={{ flex: 1 }}>
      
        <Typography type="title" className={ this.props.classes.question }>
          { question.label }
        </Typography>

        <div className={ this.props.classes.visuospatialContainer }>

          <div style={{ padding: 12, textAlign: 'center', marginBottom: 24 }}>
            <img src={ question.image } alt="question" /> 
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            { question.options.map((image, index) => (
              <div key={ index } style={{ flex: 0, padding: 12, textAlign: 'center' }}>
                <img src={ image } alt={ `answer-${ index + 1 }` } />
                <br />
                <Radio
                  name="visuospatial-question"
                  checked={ this.state.answer === index + 1 }
                  onChange={ e => this.handleAnswer(null, parseInt(e.target.value, 10)) }
                  value={ index + 1 }
                />
              </div>
            )) }
          </div>

        </div>

      </div>
    );
  }

  renderMirror (question) {
    return (
      <div style={{ flex: 1 }}>

        <div style={{ flex: 0, display: 'flex', marginBottom: 24, justifyContent: 'center' }}>

          <div style={{ flex: 0, marginRight: 24, textAlign: 'center' }}>
            <img src={ question.imageOriginal } alt="original" width={ 140 } /> 
          </div>

          <div style={{ flex: 0, marginLeft: 24, textAlign: 'center' }}>
            <img src={ question.imageMirrored } alt="mirrored" width={ 140 } /> 
          </div>

        </div>

        <Typography type="title" className={ this.props.classes.question }>
          { question.label }
        </Typography>

        <div style={{ flex: 1, padding: '0 64px' }}>
          <FormControl component="fieldset">
            <RadioGroup name="question" value={ this.state.answer } onChange={ this.handleAnswer.bind(this) }>
              <FormControlLabel
                label="Si" value="Si" control={ <Radio /> }
                classes={{ label: this.props.classes.optionLabel }}
              />
              <FormControlLabel
                label="No" value="No" control={ <Radio /> }
                classes={{ label: this.props.classes.optionLabel }}
              />
            </RadioGroup>
          </FormControl>
        </div>

      </div>
    );
  }

  renderQuestion (question) {
    switch (question.type) {
      case 'multiple-choice-question': return this.renderMultipleChoice(question);
      case 'scale-question': return this.renderScale(question);
      case 'visuospatial-question': return this.renderVisuospatial(question);
      case 'mirror-question': return this.renderMirror(question);
      default: return null;
    }
  }

  render () {

    let { classes, questions, isFetching } = this.props;
    let { currentQuestion, answer } = this.state;
    
    let question = questions[currentQuestion];
    if (!question) return null;
    
    return (
      <form onSubmit={ this.handleNext.bind(this) } className={ classes.container }>

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
              label={ answer ? 'Siguiente' : 'Omitir' }
              style={{ minWidth: '160px' }}
              disabled={ isFetching }
            />
          </div>
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(QuestionsStep);
