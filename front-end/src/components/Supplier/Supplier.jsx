import React, { Component } from 'react';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Button, Badge } from 'react-bootstrap';
import { Form } from 'react-form';

import Profile from '../common/Profile/ProfileContainer';
import Loading from '../common/Loading/Loading';

import RequestsTable from '../common/Supplies/RequestsTable/RequestsTable';

import NewOfferForm from './Forms/NewOfferForm';

class Supplier extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        gotRequests: false,
        showRequestList: false,
        selectedRequest: null,
        showOfferForm: false
      };

    this.selected = this.selected.bind(this);
    this.viewRequest = this.viewRequest.bind(this);
    this.toggleOfferForm = this.toggleOfferForm.bind(this);
    this.sendOffer = this.sendOffer.bind(this);
  }

  toggleOfferForm() {
    this.setState({showOfferForm: !this.state.showOfferForm});
  }

  sendOffer() {
    console.log('sendOffer');
  }

  viewRequest(idx) {
    console.log('viewRequest od ' + idx + ' izgleda>>>');
    console.log(this.props.requests[idx]);

    this.setState({ selectedRequest: this.props.requests[idx]});
    this.setState({ showOfferForm: true }); // da bi panel reagovao

    console.log(this.state.showOfferForm);
  }

  selected() { // samo prvi put se izvršava // poslije na REFRESH

    this.setState({showRequestList: true});

    if (!this.state.gotRequests)
    {
      this.setState({ gotRequests: true}); // dobavljeni zahtjevi
      this.props.getRequests(this.props.token);
    }
  }

  render() {
    const { requests, createdOffer, inProgress } = this.props;
    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Panel>
            <Profile />
          </Panel>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          { inProgress ? <Loading /> : null }
          <div>
            <Panel collapsible header='Requests overview' onSelect={this.selected} expanded={this.state.showRequestList}>
              {/*{<Button onClick={this.selected} style={{width: '100%'}}>Requests overview</Button>}*/}
              <RequestsTable requests={requests} viewRequest={this.viewRequest} />
              <hr/>
            </Panel>
            <Panel collapsible expanded={this.state.showOfferForm}
                   header={<Button onClick={this.toggleOfferForm}>Offer Form</Button>}>
              <button onClick={(e) => {
                e.preventDefault();
                this.setState({showOfferForm: false});
                this.setState({selectedRequest: null});
                console.log('showOfferForm na false i selectedRequest na null'); }}>
                Cancel submission
              </button>
              <br/>
              <Form onSubmit={this.sendOffer}>
                <table id="request-items">{
                  this.state.selectedRequest !== undefined && this.state.selectedRequest !== null && this.state.selectedRequest.supplyItems.length > 0 ?
                    <tbody>
                    <tr>
                      <th>Name</th>
                      <th>amount</th>
                      <th>unit</th>
                    </tr>
                    {
                      this.state.selectedRequest.supplyItems.map((item, index) => {
                        return <tr key={ index }>
                          <td>{`${item.itemName}`}</td>
                          <td>{`${item.amount}`}</td>
                          <td>{`${item.unit}`}</td>
                        </tr>
                      })}
                    </tbody>
                    :
                    <tbody>
                      <tr>
                        <th> No selected supply request. Please select one from the panel above</th>
                      </tr>
                    </tbody>
                }
                </table>
                {NewOfferForm}
              </Form>
              {
                createdOffer === null || createdOffer.price === null ?
                  null
                  :
                  <Badge>
                    { `Poslata ponuda sa cijenom ${createdOffer.price}  i
                    rokom isporuke ${createdOffer.deliveredUntil}.` }
                  </Badge>
              }
            </Panel>
          </div>
        </Col>
      </Panel>
    );
  }
}

export default Supplier;