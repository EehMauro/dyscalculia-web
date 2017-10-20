import React from 'react';
import { withStyles } from 'material-ui/styles';
import { colors } from '../../../conventions';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1.3,
    textAlign: 'center',
    padding: 24
  },
  text: {
    fontSize: 22,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 16
  },
  score: {
    display: 'inline-block',
    padding: '24px 36px',
    borderRadius: 48,
    background: `linear-gradient(45deg, ${ colors.primary['A200'] } 30%, ${ colors.secondary['A200'] } 90%)`,
    color: '#FFF',
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 16
  },
  scoreDecimals: {
    fontSize: 18,
    fontWeight: 300
  }
});

class EndStep extends React.Component {

  render () {

    let { classes, score, questionsCount } = this.props;
    
    return (
      <div style={{ textAlign: 'center' }}>

        <Typography type="title" className={ classes.title }>
          ¡Felicitaciones, terminaste!
        </Typography>

        <Typography type="title" className={ classes.text }>
          En breve vamos a entrar en contacto con vos para contarte más sobre nuestro proyecto.
        </Typography>

        <Typography type="title" className={ classes.score }>
          <span>{ score }</span>
          <span className={ classes.scoreDecimals }>/{ questionsCount }</span>
        </Typography>

        <Typography type="title" className={ classes.text }>
          Te pedimos un último favor: compartí este test con aquellas personas que pensás que podrían estar interesadas.
        </Typography>

      </div>
    );

  }

}

export default withStyles(styles)(EndStep);
