import React from 'react';
import color from 'color';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';
import { colors } from '../../../conventions';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CircularProgressbar from 'react-circular-progressbar';

const styles = theme => ({
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.3,
    textAlign: 'center',
    padding: 24,
    marginBottom: 16
  },
  text: {
    fontSize: 20,
    fontWeight: 400,
    textAlign: 'justify',
    marginBottom: 16,
    lineHeight: 1.3
  },
  scoreText: {
    marginTop: 32,
    marginBottom: 24,
    color: colors.primary['A200'],
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600
  },
  shareText: {
    marginTop: 32,
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
  button: {
    marginTop: 24,
    textAlign: 'center'
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
          En breve vamos a entrar en contacto con vos para contarte más sobre nuestro proyecto.<br/>
          Te pedimos un último favor: compartí este test con quienes pensás que podrían estar interesados. Cada persona que participa nos acerca a aprender más sobre matemática y sobre cómo las personas aprendemos matemática.<br/>
          Con un montón de trabajo, poco de suerte y gracias a la colaboración de gente como vos, capaz hasta podemos encontrar la forma de que un montón de gente no sólo no la sufra, sino que hasta la empiece a disfrutar.
        </Typography>

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

        <div className={ classes.button }>
          <RaisedButton label="Ver mis resultados" style={{ minWidth: '160px' }} onClick={ this.props.onShowResults } />
        </div>

      </div>
    );

  }

}

export default withStyles(styles)(EndStep);
