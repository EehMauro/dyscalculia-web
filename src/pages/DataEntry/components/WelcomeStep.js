import React from 'react';
import color from 'color';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';
import { colors } from '../../../conventions';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  header: {
    padding: '40px 0 48px',
    margin: '-24px -24px 24px',
    textAlign: 'center',
    fontWeight: 600,
    background: `linear-gradient(45deg, ${ color(colors.primary['A200']).fade(.3) } 30%, ${ color(colors.secondary['A200']).fade(.3) } 90%)`
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 600
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'justify'
  },
  button: {
    marginTop: 24,
    textAlign: 'center'
  }
});

class WelcomeStep extends React.Component {

  handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render () {

    let { classes } = this.props;
    
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>

        <Typography type="display2" className={ classes.header }>
          Hagamos un experimento
        </Typography>

        <Typography type="title" className={ classes.title }>
          Bienvenida/o y gracias por participar
        </Typography>

        <Typography type="body1" className={ classes.paragraph }>
          Hay muchas personas con gran dificultad en matemática, en particular en aritmética. Tenemos algunas hipótesis de cómo ayudarlas a mejorar pero para eso primero necesitamos encontrarlas. Esperamos que el test que vas a hacer a continuación nos sirva para determinar cuán queso sos (o no) en cálculo mental.
        </Typography>

        <Typography type="body1" className={ classes.paragraph }>
          Son 20 preguntas multiple choice y solamente te va a llevar algunos minutos.
        </Typography>

        <Typography type="body1" className={ classes.paragraph }>
          Dos aclaraciones: (1) el test está pensado para mayores de 16 años; (2) como tomamos el tiempo que tardás en dar cada respuesta, te pedimos que lo hagas de corrido, sin distraerte ni interrumpir para un mate.
        </Typography>

        <div className={ classes.button }>
          <RaisedButton label="Empezar" icon="chevron_right" type="submit" style={{ minWidth: '160px' }} />
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(WelcomeStep);
