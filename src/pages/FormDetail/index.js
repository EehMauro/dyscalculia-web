import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { setPageTitle } from '../../actions/navigation';
import { AdminPanelPage, AdminPanelProgressPage } from '../../components';
import { fetchForm } from '../../actions/formDetail';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  label: {
    margin: '19px 0 6px',
    color: 'rgba(33, 33, 33, 0.5)',
    fontSize: '12px'
  },
  value: {
    margin: '0 0 8px',
    fontSize: '16px',
    lineHeight: '22px',
    padding: '4px 0 3px',
    borderBottom: '1px solid rgba(33, 33, 33, 0.1)'
  },
  questionLabel: {
    margin: '19px 0 6px',
    color: 'rgba(33, 33, 33, 0.5)',
    fontSize: '12px'
  },
  questionValue: {
    margin: '0 0 8px',
    fontSize: '16px',
    lineHeight: '22px',
    padding: '4px 0 3px',
    borderBottom: '1px solid rgba(33, 33, 33, 0.1)',
    marginLeft: 32
  },
  questionIconCorrect: {
    float: 'left',
    marginRight: 8,
    marginTop: 4,
    color: '#8BC34A'
  },
  questionIconWrong: {
    float: 'left',
    marginRight: 8,
    marginTop: 4,
    color: '#F44336'
  },
  questionTime: {
    margin: '0 0 8px',
    fontSize: '14px',
    lineHeight: '22px',
    padding: '4px 0 3px',
    borderBottom: '1px solid rgba(33, 33, 33, 0.1)',
    textAlign: 'right',
    color: 'rgba(33, 33, 33, 0.75)'
  }
});

const mapStateToProps = state => ({
  formDetail: state.formDetail
});

class FormDetail extends React.Component {

  componentDidMount () {
    let { id } = this.props.params;
    this.props.dispatch(setPageTitle(`Form #${ id }`));
    this.props.dispatch(fetchForm(id));
  }

  render () {

    let { classes } = this.props;
    let { form } = this.props.formDetail;

    if (!form) {
      return <AdminPanelProgressPage />;
    }

    return (
      <div>
        <AdminPanelPage>

          <Typography type="title" className={ classes.title }>
            Information
          </Typography>

          <div>
            <p className={ classes.label }>Email</p>
            <p className={ classes.value }>{ form.email || '-' }</p>
          </div>

          <div>
            <p className={ classes.label }>Gender</p>
            <p className={ classes.value }>{ form.gender || '-' }</p>
          </div>

          <div>
            <p className={ classes.label }>Age</p>
            <p className={ classes.value }>{ form.age || '-' }</p>
          </div>

          <div>
            <p className={ classes.label }>Education level</p>
            <p className={ classes.value }>{ form.educationLevel || '-' }</p>
          </div>

          <div>
            <p className={ classes.label }>Comment</p>
            <p className={ classes.value }>{ form.comment || '-' }</p>
          </div>
        
        </AdminPanelPage>
        <AdminPanelPage>

          <Typography type="title" className={ classes.title }>
            { `Answers (${ form.correctQuestionsAmount }/${ form.questions.length })` }
          </Typography>

          { form.questions.map((question, index) => (
            <div key={ index }>
              <p className={ classes.questionLabel }>{ `${ index + 1 }. ${ question.label }` }</p>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Icon className={ question.isCorrect ? classes.questionIconCorrect : classes.questionIconWrong }>
                    { question.isCorrect ? 'check' : 'close' }
                  </Icon>
                  <p className={ classes.questionValue }>{ `${ question.answer || '-' }` }</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p className={ classes.questionTime }>
                    { `${ question.completionTime.toFixed(2) }s` }
                  </p>
                </div>
              </div>
            </div>
          )) }
        
        </AdminPanelPage>
      </div>
    );

  }

}

export default connect(mapStateToProps)(withStyles(styles)(FormDetail))
