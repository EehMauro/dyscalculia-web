import React from 'react';
import color from 'color';
import moment from 'moment';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { API_URL, colors } from '../../conventions';
import { fetchForms, fetchFormCount, setPageTitle } from '../../actions';
import { AdminPanelTablePage } from '../../components';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

const styles = theme => ({
  widget: {
    borderRadius: 0,
    background: '#FFF',
    flex: 1,
    marginRight: 24
  },
  widgetGradient: {
    display: 'flex',
    padding: 24,
    paddingTop: 27,
    paddingBottom: 24,
    background: `linear-gradient(45deg, ${ color(colors.primary['A200']).fade(.3) } 30%, ${ color(colors.secondary['A200']).fade(.4) } 90%)`
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
  },
  badgeText: {
    padding: '4px 8px',
    backgroundColor: colors.text[200],
    borderRadius: 2,
    display: 'inline-block'
  },
  badgeNumber: {
    padding: '4px 8px',
    backgroundColor: colors.text[200],
    borderRadius: 16,
    display: 'inline-block'
  }
});

const mapStateToProps = state => ({
  formsAmount: state.formCount.count || '-',
  formList: state.formList,
  token: state.session.token
});

class Dashboard extends React.Component {

  state = {
    pages: [ null ],
    currentPage: 0
  }

  componentDidMount () {
    this.props.dispatch(setPageTitle('Dashboard'));
    this.props.dispatch(fetchFormCount());
    this.props.dispatch(fetchForms());
  }

  componentWillReceiveProps (props) {
    if (props.formList.lastKey !== this.props.formList.lastKey) {
      let pages = this.state.pages;
      pages[this.state.currentPage+1] = props.formList.lastKey
      this.setState({ pages });
    }
  }

  handleNextPage () {
    let { pages, currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 }, () => {
      this.props.dispatch(fetchForms(pages[currentPage + 1]));
    });
  }

  handlePrevPage () {
    let { pages, currentPage } = this.state;
    this.setState({ currentPage: currentPage - 1 }, () => {
      this.props.dispatch(fetchForms(pages[currentPage - 1]));
    });
  }

  render () {

    let { classes } = this.props;
    let { forms } = this.props.formList;

    return (
      <div>

        <div style={{ display: 'flex', marginBottom: 24 }}>

          <Paper elevation={ 2 } className={ classes.widget }>
            <div className={ classes.widgetGradient }>
              <div style={{ flex: 0 }}>
                <Icon className={ classes.widgetIcon } style={{ fontSize: 72 }}>description</Icon>
              </div>
              <div style={{ flex: 0, minWidth: 90, marginRight: 24 }}>
                <Typography type="display2" className={ classes.widgetValue }>
                  { this.props.formsAmount }
                </Typography>
                <Typography type="title" className={ classes.widgetTitle }>
                  Forms sent
                </Typography>
              </div>
              <div style={{ flex: 1 }}>

              </div>
            </div>
          </Paper>

          <div style={{ flex: 0, minWidth: 604 }}>
            <Button
              raised color="primary" style={{ width: '100%', marginBottom: 4 }} disabled={ true }
              target="_blank" href={ `${ API_URL }/forms/csv/alldata?token=${ this.props.token }` }
            >
              <Icon>file_download</Icon>
              &nbsp;&nbsp;
              Download data
            </Button>
            <Button
              raised color="primary" style={{ width: '100%', marginBottom: 4 }} disabled={ true }
              target="_blank" href={ `${ API_URL }/forms/csv/questions?token=${ this.props.token }` }
            >
              <Icon>file_download</Icon>
              &nbsp;&nbsp;
              Download questions
            </Button>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, flexBasis: 300, marginRight: 2 }}>
                <Button
                  raised color="primary" style={{ width: '100%' }}
                  target="_blank" href={ `${ API_URL }/forms/csv/questions-specification?token=${ this.props.token }` }
                >
                  <Icon>file_download</Icon>
                  &nbsp;&nbsp;
                  Questions specification
                </Button>
              </div>
              <div style={{ flex: 1, flexBasis: 300, marginLeft: 2 }}>
                <Button
                  raised color="primary" style={{ width: '100%' }}
                  target="_blank" href={ `${ API_URL }/forms/csv/data-specification?token=${ this.props.token }` }
                >
                  <Icon>file_download</Icon>
                  &nbsp;&nbsp;
                  Data specification
                </Button>
              </div>
            </div>
          </div>

        </div>

        <AdminPanelTablePage
          headers={[
            { title: 'Creation date' },
            { title: 'Email' },
            { title: 'Score', align: 'center' },
            { title: 'Completion time', align: 'center' },
            { title: 'Tried Moravec', align: 'center' }
          ]}
          buttons={[
            { icon: 'info', action: id => this.props.dispatch(push(`/admin/forms/${ id }`)) }
          ]}
          items={ forms ? forms.map(form => (
            {
              id: form.email,
              fields: [
                { value: moment(form.ts, 'X').format('DD/MM/YYYY HH:mm') },
                { value: form.email },
                { value: <div className={ classes.badgeNumber }>{ `${ form.correctQuestionsAmount }/${ form.questions.length }` }</div> },
                { value: <div className={ classes.badgeNumber }>{ form.totalCompletionTime ? `${ (form.totalCompletionTime/1000).toFixed(2) }s` : '-' }</div> },
                { value: <div className={ classes.badgeText }>{ form.triedMoravec ? 'Yes' : 'No' }</div> }
              ]
            }
          )) : null }
        />

        <div>

          <Button raised
            color="primary"
            onClick={ this.handlePrevPage.bind(this) }
            disabled={ this.state.currentPage === 0 }
          >
            <Icon>chevron_left</Icon> Anterior 
          </Button>

          <Button raised
            color="primary"
            onClick={ this.handleNextPage.bind(this) }
            disabled={ !this.state.pages[this.state.currentPage+1] }
            style={{ float: 'right' }}
          >
            Siguiente <Icon>chevron_right</Icon>
          </Button>

        </div>

      </div>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
