import { createMuiTheme } from 'material-ui/styles';
import colors from './colors';

const {
  primary,
  secondary,
  error,
  text
} = colors;

export default function () {
  
  return createMuiTheme({
    typography: {
      fontFamily: 'Open Sans, sans-serif'
    },
    palette: {
      primary: primary,
      secondary: secondary,
      error: error
    },
    text: {
      primary: text[900],
      secondary: '#FFFFFF'
    },
    overrides: {
      MuiInput: {
        inkbar: {
          '&:after': {
            backgroundColor: primary['A200']
          }
        },
        underline: {
          '&:hover:not($disabled):before': {
            backgroundColor: text[500]
          }
        }
      },
      MuiFormLabel: {
        focused: {
          color: primary['A200']
        }
      }
    }
  })

}