import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  title: theme.mixins.gutters({
    marginBottom: 30,
    fontWeight: 400,
    lineHeight: 1.2
  }),
  input: {
    marginBottom: 20
  }
});

class EndMessage extends React.Component {

  state = {
    comment: ''
  }

  handleChange (e) {
    this.setState({ comment: e.target.value }, () => {
      this.props.onSubmit({
        ...this.state,
        type: 'comment'
      });
    });
  }

  render () {

    let { classes } = this.props;
    
    return (
      <div>

        <Typography type="headline" align="center" className={ classes.title }>
          ¿Querés agregar algún comentario?
        </Typography>
        
        <TextField fullWidth className={ classes.input }
          placeholder="Tu respuesta"
          helperText="Opcional"
          value={ this.state.comment }
          onChange={ this.handleChange.bind(this) }
          multiline rows="1" rowsMax="3"
        />

      </div>
    );

  }

}

export default withStyles(styles)(EndMessage);