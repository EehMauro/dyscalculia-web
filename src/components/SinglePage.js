import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { colors } from '../conventions';

const styles = theme => ({
  root: {
    paddingTop: 64,
    paddingBottom: 64,
    '@media only screen and (max-width : 960px)': {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  container: {
    borderRadius: 0,
    '@media only screen and (max-width : 960px)': {
      minHeight: '100vh',
      boxShadow: 'none'
    }
  },
  border: {
    background: `linear-gradient(45deg, ${ colors.primary['A200'] } 30%, ${ colors.secondary['A200'] } 90%)`,
    height: 8,
    opacity: .8
  },
  content: {
    padding: 24
  }
});

export default withStyles(styles)(({ children, classes, small, align, style }) => (
  <div>
    <div className={ classes.root }>
      <Grid container spacing={ 0 } justify="center">
        <Grid item xs={ 12 } md={ small ? 6 : 8 } lg={ small ? 4 : 6 } >
          <Paper elevation={ 2 } className={ classes.container }>
            <div className={ classes.border } />
            <div className={ classes.content } style={{ textAlign: align ? align : 'left', ...style }}>
              { children }
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </div>
));

