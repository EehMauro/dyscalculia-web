import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  container: theme.mixins.gutters({
    borderRadius: 0,
    padding: 48,
    marginBottom: 24,
    textAlign: 'center'
  })
});

export default withStyles(styles)(({ classes }) => (
  <Paper elevation={ 1 } className={ classes.container }>
    <CircularProgress size={ 100 } />
  </Paper> 
));

