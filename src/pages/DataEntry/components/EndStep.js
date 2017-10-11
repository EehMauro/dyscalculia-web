import React from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    fontSize: 26,
    fontWeight: 400,
    lineHeight: 1.3,
    textAlign: 'center',
    padding: 24
  }
});

class EndStep extends React.Component {

  render () {

    let { classes } = this.props;
    
    return (
      <div>

        <Typography type="title" className={ classes.title }>
          Se ha registrado tu respuesta
        </Typography>

      </div>
    );

  }

}

export default withStyles(styles)(EndStep);
