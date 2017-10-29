import React from 'react';
import color from 'color';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { colors } from '../conventions';

const styles = theme => ({
  button: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 32px',
    boxShadow: `0 1px 5px 2px ${ color(colors.primary['A200']).fade(.7) }`,
    fontWeight: 400
  }
});

export default withStyles(styles)(({ classes, label, icon, onClick, type, style, disabled }) => (
  <Button raised color="primary" className={ classes.button } onClick={ onClick } type={ type } style={ style } disabled={ disabled }>
    { label }
    <Icon>
      { icon }
    </Icon>
  </Button>
));
