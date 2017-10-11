import React from 'react';
import moment from 'moment';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setPageTitle } from '../../actions/navigation';
import { AdminPanelTablePage } from '../../components';
import { fetchForms } from '../../actions/formList';
import { colors } from '../../conventions';

const styles = theme => ({
  badgeText: {
    padding: '4px 8px',
    backgroundColor: colors.text[200],
    borderRadius: 2
  },
  badgeNumber: {
    padding: '4px 8px',
    backgroundColor: colors.text[200],
    borderRadius: 16,
    display: 'inline-block'
  }
});

const mapStateToProps = state => ({
  formList: state.formList
});

class FormList extends React.Component {

  componentDidMount () {
    this.props.dispatch(setPageTitle('Forms'));
    this.props.dispatch(fetchForms());
  }

  render () {

    let { classes } = this.props;
    let { forms } = this.props.formList;

    return (
      <AdminPanelTablePage
        headers={[
          { title: 'Creation date' },
          { title: 'Email', align: 'center' },
          { title: 'Age', align: 'center' },
          { title: 'Gender', align: 'center' },
          { title: 'Education level', align: 'center' },
          { title: 'Score', align: 'center' },
          { title: 'Completion time', align: 'center' }
        ]}
        buttons={[
          { icon: 'delete', action: id => console.log(id) },
          { icon: 'info', action: id => this.props.dispatch(push(`/admin/forms/${ id }`)) }
        ]}
        items={ forms ? forms.sort((a, b) => b.ts - a.ts).map(form => (
          {
            id: form.id,
            fields: [
              { value: moment(form.ts, 'X').format('DD/MM/YYYY HH:mm') },
              { value: <div className={ classes.badgeText }>{ form.email ? 'Yes' : 'No' }</div> },
              { value: <div className={ classes.badgeNumber }>{ form.age ? form.age : '-' }</div> },
              { value: form.gender ? form.gender : '-' },
              { value: form.educationLevel ? form.educationLevel : '-' },
              { value: <div className={ classes.badgeNumber }>{ `${ form.correctQuestionsAmount }/${ form.questions.length }` }</div> },
              { value: <div className={ classes.badgeNumber }>{ `${ form.totalCompletionTime.toFixed(2) }s` }</div> }
            ]
          }
        )) : null }
      />
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(FormList))
