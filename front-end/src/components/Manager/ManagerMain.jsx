import React, { Component } from 'react';
import { Form } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';
import NewSupplierForm from './Forms/NewSupplierForm';
import SupplyRequestForm from  './Forms/SupplyRequestForm';

import RequestsTable from '../common/Supplies/RequestsTable';
import RequestOffersTable from './Forms/RequestOffersTable';
import Profile from '../common/Profile/ProfileContainer';
import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, PanelGroup, Badge } from 'react-bootstrap';

import RequestItemsTable from "../common/Supplies/RequestItemsTable";

class ManagerMain extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        gotRequests: false, // stigle potražnje sa servera
        selectedRequest: {offers: null},  // potražnja odabrana za edit/end
        showRequestList: false, // prikaz stavki za odabranu potražnju
        showOffersList: false,  // prikaz ponuda za odabranu potražnju
        showRequestForm: false, // forma za novu potražnju
      };

    this.addEmployee = this.addEmployee.bind(this);
    this.addSupplier = this.addSupplier.bind(this);

    this.addSupplyRequest = this.addSupplyRequest.bind(this);

    this.selected = this.selected.bind(this);

    this.viewRequestItems = this.viewRequestItems.bind(this);
    this.endSupplyRequest = this.endSupplyRequest.bind(this);
    this.viewOffers = this.viewOffers.bind(this);

    // funkcija za ažuriranje potražnje --- ne postoji u specifikaciji!
    this.updateRequest = this.updateRequest.bind(this);
  }

  // funkcija za ažuriranje potražnje --- ne postoji u specifikaciji!
  updateRequest(values) { }

  viewOffers(index) {
    console.log('viewOffers od ' + index + ' izgleda>>>');
    console.log(this.props.requests[index]);
    this.setState({ showOffersList: true });
    this.setState({ selectedRequest: this.props.requests[index]});
  }

  viewRequestItems(index) {
    console.log('viewRequestItems od ' + index + ' izgleda>>>');
    console.log(this.props.requests[index]);

    this.setState({ selectedRequest: this.props.requests[index]});
    this.setState({ showRequestForm: true }); // SET da bi panel reagovao

    console.log('showRequestForm: ' + this.state.showRequestForm);
  }

  selected() { // samo prvi put se izvršava // poslije na REFRESH

    this.setState({showRequestList: true});

    if (!this.state.gotRequests)
    {
      this.setState({ gotRequests: true}); // dobavljeni zahtjevi

      this.props.getRequests(this.props.user.token);
    }
  }

  addEmployee() {
    this.props.addEmployee();
  }

  addSupplier(values) {
    console.log('this.props.user.token :::: ' + this.props.user.token);
    console.log(values);
    values['token'] = this.props.user.token;

    this.props.addSupplier({ values });
  }

  addSupplyRequest(values) {
    values['token'] = this.props.user.token;
    console.log('values iz funkcije menadžera');
    console.log(values);

    this.props.addSupplyRequest({ values });
  }

  endSupplyRequest(chosenOfferIndex) {
    console.log('\n<<<<< endSupplyRequest >>>>>');
    console.log(this.state.selectedRequest.id);
    console.log(this.state.selectedRequest.offers);
    console.log(this.state.selectedRequest.offers[chosenOfferIndex]);
    console.log(this.state.selectedRequest.offers[chosenOfferIndex].id);
    console.log(this.props.user.token);

    this.props.endSupplyRequest(this.state.selectedRequest.id,
      this.state.selectedRequest.offers[chosenOfferIndex].id,
      this.props.user.token);
  }



  render() {
    const { requests, createdUser, createdRequest, inProgress, addEmployee } = this.props;
    return (
      <Panel className='container' style={{marginTop: '21px'}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <Profile/>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          { inProgress ? <Loading /> : null }
          <PanelGroup>
            <Panel collapsible header="Employee addition" eventKey="1" bsStyle="success">
              <Form onSubmit={addEmployee}>
                {NewEmployeeForm}
              </Form>
            </Panel>
            <Panel collapsible header="Supplier addition" eventKey="2" bsStyle="success">
              <Form onSubmit={(values) => (this.addSupplier(values))}>
                {NewSupplierForm}
              </Form>
            </Panel>
            <Panel collapsible header="Supply request creation" eventKey="3" bsStyle="success">
              <Form onSubmit={(values) => (this.addSupplyRequest(values))}>
                {SupplyRequestForm}
              </Form>
            </Panel>
            <Panel collapsible header='Requests overview' onSelect={this.selected} eventKey="4" bsStyle="primary">
              <RequestsTable requests={requests} viewRequestItems={this.viewRequestItems} viewOffers={this.viewOffers} />
            </Panel>
            {/* OFFERS preview form */}
            <Panel header='Offers preview' collapsible expanded={this.state.showOffersList} eventKey="5" bsStyle="warning">
              <button onClick={(e) => {
                e.preventDefault();
                this.setState({showOffersList: false});
                this.setState({selectedRequest: {offers: null}});
                console.log('showRequestForm na false i selectedRequest na null'); }}>
                Cancel request ending
              </button>
              <RequestOffersTable offers={this.state.selectedRequest.offers} chooseOffer={this.endSupplyRequest}/>
            </Panel>
            {/* ITEMS preview form */}
            <Panel header='Items preview' collapsible expanded={this.state.showRequestForm} eventKey="6" bsStyle="warning">
              <button onClick={(e) => {
                e.preventDefault();
                this.setState({showRequestForm: false});
                this.setState({selectedRequest: {offers: null}});
                console.log('showRequestForm na false i selectedRequest na null'); }}>
                Close
              </button>
              <br/>
              <Form onSubmit={this.updateRequest}>
                <RequestItemsTable request={this.state.selectedRequest} />
              </Form>
            </Panel>
          </PanelGroup>

          {
            createdUser !== null && createdUser.id !== null ?
              <Badge>Napravljen user: {`${createdUser.firstName}`}</Badge>
              :
              null
          }
          {
            createdRequest.id !== null ?
              <Badge>
                Rezultujući SupplyRequest:
                {`${createdRequest.publishingDate} ~ ${createdRequest.endingDate}`}
              </Badge>
              :
              null
          }
        </Col>
      </Panel>
    );
  }
}

export default ManagerMain;