import React from 'react';

class RequestsTable extends React.Component {
  render() {

    let actionColumn = <th>action</th>;
    if (this.props.viewOffers !== undefined)
      actionColumn = <th colSpan={2}>actions</th>;

    return (
      <table id="requests-table">
        {
          this.props.requests !== undefined &&
          this.props.requests.length > 0 ?
            <tbody>
            <tr>
              <th>From</th><th>To</th><th>ended (?)</th><th># of Items</th><th># of Offers</th>{actionColumn}
            </tr>
            {
              this.props.requests.map((request, index) => {
                const endButton = this.props.viewOffers !== undefined && !request.ended?
                  <button style={{width: '100%'}}
                    onClick={() => {
                      this.props.viewOffers(index)
                    }}>View offers
                  </button>
                  : null;
                return <tr key={ index }>
                  <td>{`${request.publishingDate}`}</td>
                  <td>{`${request.endingDate}`}</td>
                  <td>{`${request.ended}`}</td>
                  <td>{`${request.supplyItems.length}`}</td>
                  <td>{`${request.offers.length}`}</td>
                  <td>
                    <button style={{width: '100%'}}
                            onClick={() => {
                      this.props.viewRequestItems(index)
                    }}>
                      Preview<br/>items
                    </button>
                  </td>
                  <td>{endButton}</td>
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