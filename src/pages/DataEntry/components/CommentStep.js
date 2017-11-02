import React from 'react';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

const styles = theme => ({
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 600
  },
  input: {
    marginBottom: 32
  },
  button: {
    marginTop: 20,
    textAlign: 'right'
  },
  textarea: {
    width: '100%'
  }
});

class CommentStep extends React.Component {

  state = {
    comment: '',
    triedMoravec: '',
    submitted: false
  }

  getLabel () {
    if (this.state.comment === '') return 'Omitir';
    return 'Siguiente';
  }

  handleChangeComment (event) {
    this.setState({ comment: event.target.value });
  }

  handleChangeSelect (event) {
    this.setState({ triedMoravec: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    this.setState({ submitted: true });
    let { comment, triedMoravec } = this.state;
    if (triedMoravec !== '') {
      this.props.onSubmit({
        comment: comment !== '' ? comment : null,
        triedMoravec: triedMoravec
      });
    }
  }

  render () {

    let { classes, isFetching } = this.props;
    
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>

        <Typography type="title" className={ classes.title }>
          ¿Usaste Moravec o alguna otra aplicación para entrenar cálculo mental? *
        </Typography>

        <FormControl fullWidth required error={ this.state.triedMoravec === '' && this.state.submitted } className={ classes.input }>
          <RadioGroup required
            name="tried-moravec"
            value={ this.state.triedMoravec }
            onChange={ this.handleChangeSelect.bind(this) }
            style={{ flexDirection: 'row' }}
          >
            <FormControlLabel value="Si" control={<Radio />} label="Si" style={{ marginRight: 48 }} />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          { this.state.triedMoravec === '' && this.state.submitted ?
            <FormHelperText>Este campo es obligatorio</FormHelperText>
          : null }
        </FormControl>

        <Typography type="title" className={ classes.title }>
          ¿Querés agregar algún comentario?
        </Typography>

        <TextField fullWidth
          placeholder="Tu respuesta"
          helperText="Opcional"
          value={ this.state.comment }
          onChange={ this.handleChangeComment.bind(this) }
        />

        <div className={ classes.button }>
          <RaisedButton label="Siguiente" type="submit" style={{ minWidth: '160px' }} disabled={ isFetching } />
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(CommentStep);
