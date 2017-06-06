import React from 'react';

class RequestsTable extends React.Component {
  render() {
    return (
      <table id="requests-table">
        {
          this.props.requests !== undefined &&
          this.props.requests.length > 0 ?
            <tbody>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>ended (?)</th>
              <th># of Items</th>
              <th># of Offers</th>
              <th>akcija</th>
            </tr>
            {
              this.props.requests.map((request, index) => {
                return <tr key={ index }>
                  <td>{`${request.publishingDate}`}</td>
                  <td>{`${request.endingDate}`}</td>
                  <td>{`${request.ended}`}</td>
                  <td>{`${request.supplyItems.length}`}</td>
                  <td>{`${request.offers.length}`}</td>
                  <td>
                    <button style={{width: '100%'}}
                            onClick={() => {
                      this.props.viewRequest(index)
                    }}>Odaberi
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
            : <tbody>
          <tr>
            <th>All requests</th>
          </tr>
          </tbody>
        }
      </table>
    )
  }
}

export default RequestsTable;