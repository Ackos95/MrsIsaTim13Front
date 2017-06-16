
import React, { Component } from 'react';
import { Form } from 'react-form';

import NewEmployeeForm from './Forms/NewEmployeeForm';
import NewSupplierForm from './Forms/NewSupplierForm';
import SupplyRequestForm from  './Forms/SupplyRequestForm';

import RequestsTable from '../common/Supplies/RequestsTable/RequestsTable';
import Profile from '../common/Profile/ProfileContainer';
import Loading from '../common/Loading/Loading';

import DocumentInput from './Forms/DocumentInput';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Panel, Accordion, Badge } from 'react-bootstrap';

class Manager extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        gotRequests: false,
        showRequestList: false,
        selectedRequest: null,
        showRequestForm: false
      };

    this.addEmployee = this.addEmployee.bind(this);
    this.addSupplier = this.addSupplier.bind(this);

    this.addSupplyRequest = this.addSupplyRequest.bind(this);

    this.selected = this.selected.bind(this);
    this.viewRequest = this.viewRequest.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
  }

  updateRequest() {

  }

  viewRequest(idx) {
    console.log('viewRequest od ' + idx + ' izgleda>>>');
    console.log(this.props.requests[idx]);

    this.setState({ selectedRequest: this.props.requests[idx]});
    this.setState({ showRequestForm: true }); // SET da bi panel reagovao

    console.log(this.state.showRequestForm);
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


  render() {
    const { requests, created, createdRequest, inProgress, addEmployee } = this.props;
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
          <Accordion>
            <Panel header="Employee addition" eventKey="1">
              <Form onSubmit={addEmployee}>
                {NewEmployeeForm}
              </Form>
            </Panel>
            <Panel header="Supplier addition" eventKey="2">
              <Form onSubmit={(values) => (this.addSupplier(values))}>
                {NewSupplierForm}
              </Form>
            </Panel>
            <Panel header="Supply request creation" eventKey="3">
              <Form onSubmit={(values) => (this.addSupplyRequest(values))}>
                {SupplyRequestForm}
              </Form>
            </Panel>
            <Panel collapsible header='Requests overview' onSelect={this.selected}>
              <RequestsTable requests={requests} viewRequest={this.viewRequest} />
            </Panel>
            <Panel collapsible expanded={this.state.showRequestForm}
                   header='Offer Form'>
              <button onClick={(e) => {
                e.preventDefault();
                this.setState({showRequestForm: false});
                this.setState({selectedRequest: null});
                console.log('showRequestForm na false i selectedRequest na null'); }}>
                Cancel submission
              </button>
              <br/>
              <Form onSubmit={this.updateRequest}>
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
                        return <DocumentInput key={index} index={index} item={item}/>
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
                {/*{NewOfferForm}*/}
              </Form>
            </Panel>
          </Accordion>
          {
            created.id !== null ?
            <Badge>Napravljen user: {`${created.firstName}`}</Badge>
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

export default Manager;