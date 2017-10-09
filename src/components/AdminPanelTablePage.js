import React from 'react';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { AdminPanelPage, AdminPanelProgressPage } from '../components';

export default class TablePage extends React.Component {

  renderHeader () {
    let { headers, buttons } = this.props;
    return (
      <TableHead>
        <TableRow>
          { headers.filter(header => header !== null).map((header, index) => (
            <TableCell key={ index }>
              <div style={{ textAlign: header.align }}>
                { header.title }
              </div>
            </TableCell>
          )) }
          { buttons ?
            <TableCell key={ headers.filter(header => header !== null).length } />
          : null}
        </TableRow>
      </TableHead>
    );
  }

  renderBody () {
    let { items, headers, buttons } = this.props;
    return (
      <TableBody>
        { items.map((item, itemIndex) => (
          <TableRow key={ itemIndex }>
            { item.fields.filter(field => field !== null).map((field, fieldIndex) => {
              let header = headers.filter(header => header !== null)[fieldIndex];
              return (
                <TableCell key={ fieldIndex }>
                  <div style={{ textAlign: header.align }}>
                    { field.value }
                  </div>
                </TableCell>
              );
            }) }
            { buttons ?
              <TableCell numeric padding="dense">
                { buttons.map((button, index) => 
                  <IconButton key={ index } onClick={ () => button.action(item.id) } >
                    <Icon>{ button.icon }</Icon>
                  </IconButton>
                ) }
              </TableCell>
            : null }
          </TableRow>
        )) }
      </TableBody>
    );
  }

  render () {

    let { items } = this.props;
    
    if (!items) {
      return <AdminPanelProgressPage />;
    }
    
    return (
      <AdminPanelPage noPadding>
        <Table>
          { this.renderHeader() }
          { this.renderBody() }
        </Table>
      </AdminPanelPage>
    );

  }

}
