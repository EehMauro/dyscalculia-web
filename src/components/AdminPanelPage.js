import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: theme.mixins.gutters({
    borderRadius: 0,
    padding: 24,
    marginBottom: 24
  }),
  containerNoPadding: {
    borderRadius: 0,
    padding: 0,
    marginBottom: 24
  },
});

export default withStyles(styles)(({ children, classes, noPadding }) => (
  <Paper elevation={ 1 } className={ noPadding ? classes.containerNoPadding : classes.container }>
    { children }
  </Paper>
));

