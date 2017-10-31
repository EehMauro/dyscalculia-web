import React from 'react';
import color from 'color';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { colors } from '../../conventions';
import { fetchForms, setPageTitle } from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  widget: {
    borderRadius: 0,
    background: colors.primary['A200']
  },
  widgetGradient: {
    display: 'flex',
    padding: 24,
    paddingBottom: 22,
    background: `linear-gradient(45deg, ${ colors.primary['A200'] } 30%, ${ color(colors.secondary['A200']).fade(.5) } 90%)`
  },
  widgetTitle: {
    color: '#FFF',
    padding: 0,
    margin: 0,
    fontWeight: 400,
    fontSize: 16,
    paddingTop: 4
  },
  widgetValue: {
    color: '#FFF',
    padding: 0,
    margin: 0,
    fontWeight: 600
  },
  widgetIcon: {
    color: '#FFF',
    paddingRight: 24,
    paddingTop: 2
  }
});

const mapStateToProps = state => ({
  formsAmount: state.formList.forms ? state.formList.forms.length : '-'
});

class Dashboard extends React.Component {

  componentDidMount () {
    this.props.dispatch(setPageTitle('Dashboard'));
    this.props.dispatch(fetchForms());
  }

  render () {

    let { classes } = this.props;

    return (
      <Grid container spacing={ 24 }>

        <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
          <Paper elevation={ 2 } className={ classes.widget }>
            <div className={ classes.widgetGradient }>
              <div style={{ flex: 0 }}>
                <Icon className={ classes.widgetIcon } style={{ fontSize: 72 }}>description</Icon>
              </div>
              <div style={{ flex: 1 }}>
                <Typography type="display2" className={ classes.widgetValue }>
                  { this.props.formsAmount }
                </Typography>
                <Typography type="title" className={ classes.widgetTitle }>
                  Forms sent
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
          <Paper elevation={ 2 } className={ classes.widget }>
            <div className={ classes.widgetGradient }>
              <div style={{ flex: 0 }}>
                <Icon className={ classes.widgetIcon } style={{ fontSize: 72 }}>done</Icon>
              </div>
              <div style={{ flex: 1 }}>
                <Typography type="display2" className={ classes.widgetValue }>
                  0
                </Typography>
                <Typography type="title" className={ classes.widgetTitle }>
                  Test metric 1
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
          <Paper elevation={ 2 } className={ classes.widget }>
            <div className={ classes.widgetGradient }>
              <div style={{ flex: 0 }}>
                <Icon className={ classes.widgetIcon } style={{ fontSize: 72 }}>star</Icon>
              </div>
              <div style={{ flex: 1 }}>
                <Typography type="display2" className={ classes.widgetValue }>
                  0
                </Typography>
                <Typography type="title" className={ classes.widgetTitle }>
                  Test metric 2
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>

      </Grid>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
