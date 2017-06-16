import React, { Component } from 'react';
import { Col, Nav, Row,  Tab, NavItem, Panel } from 'react-bootstrap';

class RestaurantManagement extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        tablesLoaded: false, //
        obj2: null,  //
        tables: [], // svi stolovi
      };

    this.updateConfig = this.updateConfig.bind(this);
  }

  updateConfig() {
    console.log('Simanje konfiguracije.....');
  }

  componentDidMount() {
    if (!this.state.tablesLoaded)
      console.log('Kao poziv this.props.loadConfig();');
    // this.props.loadConfig(); // getLoggedUser().getRestaurant().getTableConfig()....
  }

  render() {
    //const {a,b,c} = this.props;

    return (
      <Panel>

      </Panel>);
  }

}

export default RestaurantManagement;