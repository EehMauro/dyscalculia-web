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
          title="Hagamos un experimento"
          link={[
            {
              rel: 'stylesheet',
              href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'
            },
            { 
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css?family=Material+Icons'
            },
            { 
              rel: 'stylesheet',
              href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
            }
          ]}
          style={[
            {
              type: 'text/css',
              cssText: `
                html {
                  font-family: Roboto !important;
                  background: ${ colors.text[100] };
                  color: ${ colors.text[900] };
                }
                .CircularProgressbar-path {
                  stroke: ${ colors.primary['A200'] } !important;
                }
                .CircularProgressbar-text {
                  fill: ${ colors.primary['A200'] } !important;
                  font-size: 20px !important;
                  font-family: Roboto !important;
                  font-weight: 400 !important;
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