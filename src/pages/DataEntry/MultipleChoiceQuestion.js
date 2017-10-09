import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  title: theme.mixins.gutters({
    marginBottom: 30,
    fontWeight: 400,
    lineHeight: 1.2
  }),
  form: theme.mixins.gutters({
    marginBottom: '12px'
  }),
  optionLabel: {
    fontSize: '20px',
    position: 'relative',
    top: '-1px'
  },
  image: {
    maxWidth: '100%',
    flex: 1
  }
});

class MultipleChoiceQuestion extends React.Component {

  state = {
    answer: ''
  }

  handleChange (event, answer) {
    this.setState({ answer }, () => {
      this.props.onSubmit({
        answer: answer,
        isCorrect: answer === this.props.data.correctAnswer
      });
    });
  }

  render () {

    let { classes, data } = this.props;
    
    return (
      <div>

        <Typography type="headline" className={ classes.title }>
          { data.label }
        </Typography>

        <Grid container spacing={ 24 } justify="center">

          { data.image ?
            <Grid item xs={ 12 } md={ 6 } lg={ 6 }>
              <img src={ data.image } className={ classes.image } alt={ data.label } /> 
            </Grid>
          : null }

          <Grid item xs={ 12 } md={ data.image ? 6 : 12 } lg={ data.image ? 6 : 12 }>
            <FormControl component="fieldset" className={ classes.form }>
              <RadioGroup
                aria-label="question"
                name="question"
                value={ this.state.answer }
                onChange={ this.handleChange.bind(this) }
              >
                { 
                  data.options.map((option, index) => (
                    <FormControlLabel
                      key={ index }
                      label={ option }
                      value={ option }
                      control={ <Radio /> }
                      classes={{ label: classes.optionLabel }}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>
      
      </div>
    );

  }

}

export default withStyles(styles)(MultipleChoiceQuestion);