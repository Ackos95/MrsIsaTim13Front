import React from 'react';

class RequestOfferTable extends React.Component {
  render() {
    if (this.props.offers === undefined || this.props.offers === null)
    {
      return (
        <table id="requests-table">
          <tbody>
          <tr>
            <th>Please select a request from the panel above.</th>
          </tr>
          </tbody>
        </table>
      );
    }
    else
      {
        if (this.props.offers.length > 0)
        {
        return (
          <table id="requests-table">
            <tbody>
            <tr>
              <th>Price</th>
              {/*<th>By supplier</th>*/}
              <th>Guarantee</th>
              <th>Delivered until</th>
              <th>action</th>
            </tr>
            {
              this.props.offers.map((offer, index) => {
                const endButton = this.props.chooseOffer !== undefined && !offer.ended ?
                  <button style={{width: '100%'}}
                          onClick={() => {
                            this.props.chooseOffer(index)
                          }}>Choose
                  </button>
                  : <button disabled={true}>ponuda je završena</button>;
                return <tr key={ index }>
                  <td>{`${offer.price}`}</td>
                  {/*<td>{`${offer.bySupplier.firstName} ${offer.bySupplier.lastName}`}</td>*/}
                  <td>{`${offer.guarantee}`}</td>
                  <td>{`${offer.deliveredUntil}`}</td>
                  <td>{endButton}</td>
                </tr>
              })
            }
            </tbody>
          </table>
        )
      }
      else
        return (
          <table>
            <tbody>
            <tr>
              <th>No offers for this request</th>
            </tr>
            </tbody>
          </table>);
    } // kraj else-a od  offers === undefined || null
  } // kraj render-a
} // kraj klase

export default RequestOfferTable;