import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setPageTitle } from '../../actions/navigation';
import { AdminPanelPage } from '../../components';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  
});

const mapStateToProps = state => ({
  session: state.session
});

class Dashboard extends React.Component {

  componentDidMount () {
    this.props.dispatch(setPageTitle('Dashboard'));
  }

  render () {

    let { classes } = this.props;

    return (
      <AdminPanelPage>

        <Typography type="headline" className={ classes.title }>
          Coming soon...
        </Typography>
      
      </AdminPanelPage>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
