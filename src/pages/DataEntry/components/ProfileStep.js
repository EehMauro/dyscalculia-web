import React from 'react';
import { withStyles } from 'material-ui/styles';
import { RaisedButton } from '../../../components';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 600
  },
  input: {
    marginBottom: 20
  },
  button: {
    textAlign: 'right'
  },
  helperText: {
    fontSize: 10
  }
});

class ProfileStep extends React.Component {

  state = {
    email: '',
    age: '',
    gender: '',
    educationLevel: ''
  }

  handleChange (field, value) {
    this.setState({ [field]: value });
  }

  handleChangeAge (value) {
    value = parseInt(value, 10);
    if (!value) return this.handleChange('age', '');
    if (value > 100 || value < 0) return;
    this.handleChange('age', value);
  }

  handleSubmit (event) {
    event.preventDefault();
    let { email, age, gender, educationLevel } = this.state;
    this.props.onSubmit({
      email: email,
      age: age !== '' ? age : null,
      gender: gender !== '' ? gender : null,
      educationLevel: educationLevel !== '' ? educationLevel : null
    });
  }

  render () {

    let { classes } = this.props;
    
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>

        <Typography type="title" className={ classes.title }>
          Complete la siguiente información
        </Typography>

        <TextField fullWidth required className={ classes.input }
          label="Email"
          type="email"
          name="email"
          value={ this.state.email }
          onChange={ e => this.handleChange('email', e.target.value) }
        />

        <TextField fullWidth className={ classes.input }
          label="Edad"
          type="number"
          name="age"
          helperText="Opcional"
          value={ this.state.age }
          onChange={ e => this.handleChangeAge(e.target.value) }
          FormHelperTextProps={{
            classes: { root: classes.helperText }
          }}
        />

        <FormControl fullWidth className={ classes.input }>
          <InputLabel htmlFor="gender">Sexo</InputLabel>
          <Select
            input={ <Input id="gender" /> }
            value={ this.state.gender }
            onChange={ e => this.handleChange('gender', e.target.value) }
          >
            <MenuItem value="female">Mujer</MenuItem>
            <MenuItem value="male">Varón</MenuItem>
            <MenuItem value="other">Otro</MenuItem>
          </Select>
          <FormHelperText classes={{ root: classes.helperText }}>Opcional</FormHelperText>
        </FormControl>

        <FormControl fullWidth className={ classes.input }>
          <InputLabel htmlFor="education-level">Nivel de educación</InputLabel>
          <Select
            input={ <Input id="education-level" /> }
            value={ this.state.educationLevel }
            onChange={ e => this.handleChange('educationLevel', e.target.value) }
          >
            <MenuItem value="none">Ninguno</MenuItem>
            <MenuItem value="primary">Primario</MenuItem>
            <MenuItem value="high-school">Secundario</MenuItem>
            <MenuItem value="academic">Terciario / Universitario</MenuItem>
            <MenuItem value="postgraduate">Posgrado</MenuItem>
          </Select>
          <FormHelperText classes={{ root: classes.helperText }}>Opcional</FormHelperText>
        </FormControl>

        <div className={ classes.button }>
          <RaisedButton label="Siguiente" type="submit" style={{ minWidth: '160px' }} />
        </div>

      </form>
    );

  }

}

export default withStyles(styles)(ProfileStep);
