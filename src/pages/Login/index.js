import React from 'react';
import color from 'color';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { SinglePage } from '../../components';
import { colors } from '../../conventions';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import { doLogin } from '../../actions/session';

const styles = theme => ({
  title: theme.mixins.gutters({
    marginTop: 12,
    marginBottom: 24,
    fontWeight: 600
  }),
  error: {
    color: colors.error[500],
    marginTop: 24
  },
  input: {
    marginBottom: 20
  },
  button: {
    background: `linear-gradient(45deg, ${ colors.primary['A200'] } 30%, ${ colors.secondary['A200'] } 90%)`,
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 32px',
    boxShadow: `0 3px 5px 2px ${ color(colors.primary['A200']).fade(0.7) }`,
    marginTop: 12
  }
});

const mapStateToProps = state => ({
  session: state.session
});

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    error: false
  }

  componentWillReceiveProps (props) {
    if (props.session.didLoginInvalidate && !this.props.session.didLoginInvalidate) {
      this.setState({ error: true });
    }
  }

  handleChange (field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.setState({ error: false });
    let { username, password } = this.state;
    this.props.dispatch(doLogin(username, password));
  }

  render () {

    let { classes } = this.props;
    let { error, username, password } = this.state;

    return (
      <SinglePage small>

        <Typography type="headline" align="center" className={ classes.title }>
          Admin panel
        </Typography>

        <form onSubmit={ this.handleSubmit.bind(this) }>
        
          <TextField fullWidth
            label="Username"
            value={ username }
            onChange={ e => this.handleChange('username', e.target.value) }
            className={ classes.input }
          />

          <TextField fullWidth
            label="Password"
            type="password"
            value={ password }
            onChange={ e => this.handleChange('password', e.target.value) }
            className={ classes.input }
          />

          <div style={{ textAlign: 'center' }}>

            <Button raised
              color="primary"
              type="submit"
              className={ classes.button }
              disabled={ this.props.session.loginIsFetching || this.props.session.sessionIsFetching }
            >
              Submit
              <KeyboardArrowRight />
            </Button>

          </div>

          { error ?
            <Typography type="caption" align="center" className={ classes.error }>
              Wrong username or password
            </Typography>
          : null }

        </form>
      
      </SinglePage>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(Login))
