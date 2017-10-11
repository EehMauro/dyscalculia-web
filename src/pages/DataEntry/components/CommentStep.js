import React from 'react';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 600
  },
  button: {
    marginTop: 20,
    textAlign: 'right'
  }
});

class CommentStep extends React.Component {

  state = {
    comment: ''
  }

  getLabel () {
    if (this.state.comment === '') return 'Omitir';
    return 'Siguiente';
  }

  handleChange (event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault();
    let { comment } = this.state;
    this.props.onSubmit(comment !== '' ? comment : null);
  }

  render () {

    let { classes } = this.props;
    
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>

        <Typography type="title" className={ classes.title }>
          ¿Querés agregar algún comentario?
        </Typography>

        <TextField fullWidth
          placeholder="Tu respuesta"
          helperText="Opcional"
          value={ this.state.comment }
          onChange={ this.handleChange.bind(this) }
          multiline rows="1" rowsMax="3"
        />

        <div className={ classes.button }>
          <RaisedButton label={ this.getLabel() } icon="chevron_right" type="submit" style={{ minWidth: '160px' }} />
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(CommentStep);
