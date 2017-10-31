import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { SinglePage, RaisedButton } from '../../components';
import { colors } from '../../conventions';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { doLogin } from '../../actions';

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

          <div style={{ textAlign: 'center', marginTop: 12 }}>

            <RaisedButton
              type="submit"
              label="Submit"
              icon="chevron_right"
              style={{ minWidth: '160px' }}
              disabled={ this.props.session.loginIsFetching || this.props.session.sessionIsFetching }
            />

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
