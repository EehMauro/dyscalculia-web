import React from 'react';
import color from 'color';
import { withStyles } from 'material-ui/styles';
import { colors } from '../../../conventions';

import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CircularProgressbar from 'react-circular-progressbar';
import { red, lightGreen } from 'material-ui/colors';

const styles = theme => ({
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.3,
    textAlign: 'center',
    padding: 24,
    marginBottom: 16
  },
  scoreText: {
    marginTop: 24,
    marginBottom: 24,
    color: colors.primary['A200'],
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600
  },
  shareText: {
    marginTop: 24,
    marginBottom: 46,
    color: colors.secondary['A200'],
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600
  },
  progress: {
    width: 100,
    marginBottom: 16
  },
  icon: {
    fontSize: 32,
    color: '#FFF'
  },
  facebook: {
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#4469AF',
    '&:hover': { backgroundColor: color('#4469AF').lighten(.25).hex() }
  },
  twitter: {
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#2AA2EF',
    '&:hover': { backgroundColor: color('#2AA2EF').lighten(.25).hex() }
  },
  whatsapp: {
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#159588',
    '&:hover': { backgroundColor: color('#159588').lighten(.25).hex() }
  },
  question: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 400,
    lineHeight: 1.3,
    textAlign: 'left'
  },
  answerIcon: {
    flex: 0,
    marginRight: 8,
    lineHeight: '34px !important',
    flexBasis: 24
  },
  correctAnswerIcon: {
    color: lightGreen[600]
  },
  incorrectAnswerIcon: {
    color: red[600]
  },
  answer: {
    flex: 1,
    backgroundColor: colors.text[100],
    borderLeft: `4px solid ${ colors.text[400] }`,
    padding: '8px 16px',
    textAlign: 'left'
  },
  correctAnswer: {
    backgroundColor: lightGreen[100],
    borderLeft: `4px solid ${ lightGreen[400] }`,
  },
  incorrectAnswer: {
    backgroundColor: red[100],
    borderLeft: `4px solid ${ red[400] }`,
  },
  imageAnswerIcon: {
    flex: 0,
    marginRight: 8,
    lineHeight: '76px !important',
    flexBasis: 24
  },
  correctImageAnswerIcon: {
    color: lightGreen[600]
  },
  incorrectImageAnswerIcon: {
    color: red[600]
  },
  imageAnswer: {
    padding: 2,
    border: `4px solid ${ colors.text[400] }`
  },
  correctImageAnswer: {
    border: `4px solid ${ lightGreen[400] }`
  },
  incorrectImageAnswer: {
    border: `4px solid ${ red[400] }`
  }
});

class ResultsStep extends React.Component {

  renderAnswers (question, answer) {
    let { classes } = this.props;
    if (question.type === 'multiple-choice-question') {
      return question.options.map((option, index) => {
        let isCorrect = question.correctAnswer === option;
        let isWrong = answer && answer.answer === option && !isCorrect;
        return (
          <div style={{ marginBottom: 8, display: 'flex' }} key={ index }>
            <Icon className={ `${ classes.answerIcon } ${ isCorrect ? classes.correctAnswerIcon : '' } ${ isWrong ? classes.incorrectAnswerIcon : '' }`  }>
              { isCorrect ? 'check_circle' : '' }
              { isWrong ? 'cancel' : '' }
            </Icon>  
            <div className={ `${ classes.answer } ${ isCorrect ? classes.correctAnswer : '' } ${ isWrong ? classes.incorrectAnswer : '' }`  }>
              { option }
            </div>
          </div>
        );
      });
    } else {
      return question.options.map((option, index) => {
        let isCorrect = question.correctAnswer === index;
        let isWrong = answer && answer.answer === index && !isCorrect;
        return (
          <div style={{ marginBottom: 8, display: 'flex' }} key={ index }>
            <Icon className={ `${ classes.imageAnswerIcon } ${ isCorrect ? classes.correctImageAnswerIcon : '' } ${ isWrong ? classes.incorrectImageAnswerIcon : '' }`  }>
              { isCorrect ? 'check_circle' : '' }
              { isWrong ? 'cancel' : '' }
            </Icon>  
            <div className={ `${ classes.imageAnswer } ${ isCorrect ? classes.correctImageAnswer : '' } ${ isWrong ? classes.incorrectImageAnswer : '' }`  }>
              <div style={{
                width: 64, height: 64,
                backgroundColor: '#FFF',
                backgroundImage: `url(${ option })`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }} />
            </div>
          </div>
        );
      });
    }
  }

  renderQuestions () {
    let { classes, questions, answers } = this.props;
    return questions.map((question, index) => {
      let answer = answers.find(a => a.id === question.id);
      return (
        <div key={ question.id } style={{ marginBottom: 24 }}>
          <Typography type="title" className={ classes.question }>
            { `${ index + 1 }. ${ question.label }` }
          </Typography>
          { this.renderAnswers(question, answer) }
        </div>
      );
    });
  }

  render () {

    let { classes, score, questionsCount } = this.props;
    
    return (
      <div style={{ textAlign: 'center' }}>

        <Typography type="title" className={ classes.title }>
          Resultados
        </Typography>

        { this.renderQuestions() }

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

          <div style={{ flex: 1, paddingLeft: 32, paddingRight: 32 }}>

            <Typography type="title" className={ classes.scoreText }>
              Tu puntaje
            </Typography>

            <CircularProgressbar
              percentage={ score * 100 / questionsCount }
              textForPercentage={ () => `${ score }/${ questionsCount }` }
              className={ classes.progress }
            />

          </div>

          <div style={{ flex: 1, paddingLeft: 32, paddingRight: 32, marginBottom: 24 }}>

            <Typography type="title" className={ classes.shareText }>
              Compartí
            </Typography>

            <div>

              <Button
                fab color="inherit" classes={{ root: classes.facebook }} target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=http://queso.elgatoylacaja.com.ar"
              >
                <i className={`ion-social-facebook ${ classes.icon }`} />
              </Button>

              <Button
                fab color="inherit" classes={{ root: classes.twitter }} target="_blank"
                href="http://twitter.com/share?text=Hagamos%20un%20experimento&url=http://queso.elgatoylacaja.com.ar"
              >
                <i className={`ion-social-twitter ${ classes.icon }`} />
              </Button>

              <Button
                fab color="inherit" classes={{ root: classes.whatsapp }}
                href="whatsapp://send?text=Hagamos%20un%20experimento%0Ahttp://queso.elgatoylacaja.com.ar"
              >
                <i className={`ion-social-whatsapp ${ classes.icon }`} />
              </Button>

            </div>

          </div>

        </div>

      </div>
    );

  }

}

export default withStyles(styles)(ResultsStep);
