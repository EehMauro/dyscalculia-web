import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

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

class StartForm extends React.Component {

  state = {
    email: '',
    age: '',
    gender: '',
    educationLevel: ''
  }

  handleChange (field, value) {
    this.setState({ [field]: value }, () => {
      this.props.onSubmit({
        ...this.state,
        type: 'start-form'
      });
    });
  }

  handleChangeAge (value) {
    value = parseInt(value, 10);
    if (!value) return this.handleChange('age', '');
    if (value > 100 || value < 0) return;
    this.handleChange('age', value);
  }

  render () {

    let { classes } = this.props;
    
    return (
      <div>

        <Typography type="title" align="center" className={ classes.title }>
          Para comenzar complete la siguiente información
        </Typography>
        
        <form>
        
          <TextField fullWidth className={ classes.input }
            label="Email"
            type="email"
            name="email"
            helperText="Opcional"
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
          />

          <FormControl fullWidth className={ classes.input }>
            <InputLabel htmlFor="gender">Sexo</InputLabel>
            <Select
              input={ <Input id="gender" /> }
              value={ this.state.gender }
              onChange={ e => this.handleChange('gender', e.target.value) }
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Femenino</MenuItem>
              <MenuItem value="other">Otro</MenuItem>
            </Select>
            <FormHelperText>Opcional</FormHelperText>
          </FormControl>

          <FormControl fullWidth className={ classes.input }>
            <InputLabel htmlFor="education-level">Nivel de educación</InputLabel>
            <Select
              input={ <Input id="education-level" /> }
              value={ this.state.educationLevel }
              onChange={ e => this.handleChange('educationLevel', e.target.value) }
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="none">Ninguno</MenuItem>
              <MenuItem value="primary">Primario</MenuItem>
              <MenuItem value="high-school">Secundario</MenuItem>
              <MenuItem value="academic">Terciario / Universitario</MenuItem>
              <MenuItem value="postgraduate">Posgrado</MenuItem>
            </Select>
            <FormHelperText>Opcional</FormHelperText>
          </FormControl>

        </form>
      
      </div>
    );

  }

}

export default withStyles(styles)(StartForm);