import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { MuiThemeProvider } from 'material-ui/styles';
import { getTheme, colors } from '../conventions';

class Wrapper extends React.Component {

  render () {
    return (
      <div>
        <Helmet
          title="Test"
          link={[
            {
              rel: 'stylesheet',
              href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'
            },
            { 
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css?family=Material+Icons'
            }
          ]}
          style={[
            {
              type: 'text/css',
              cssText: `
                html {
                  font-family: Open Sans !important;
                  background: ${ colors.text[100] };
                  color: ${ colors.text[900] };
                }
              `
            }
          ]}
        />
        <MuiThemeProvider theme={ getTheme() }>
          <div>
            { this.props.children }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}

export default connect()(Wrapper);