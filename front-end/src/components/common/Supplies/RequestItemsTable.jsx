import React from 'react';

class RequestItemsTable extends React.Component {
  render() {

    return (<table id="request-items">{
        this.props.request !== undefined && this.props.request !== null &&
        this.props.request.supplyItems !== undefined  && this.props.request.supplyItems !== null ?
          <tbody>
          <tr>
            <th>Name</th>
            <th>amount</th>
            <th>unit</th>
          </tr>
          {
            this.props.request.supplyItems.length > 0 ?
            this.props.request.supplyItems.map((item, index) => {
              return <tr key={ index }>
                <td>{`${item.itemName}`}</td>
                <td>{`${item.amount}`}</td>
                <td>{`${item.unit}`}</td>
              </tr>
            })
            :
            <tr><td style={{textAlign: 'center'}}>no supply items</td></tr>}
          </tbody>
          :
          <tbody>
          <tr>
            <th> No selected supply request. Please select one from the panel above</th>
          </tr>
          </tbody>
      }
      </table>
    );
  }
}

export default RequestItemsTable;