// Guest profile page

import React, { Component } from 'react';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Nav, Row,  Tab, NavItem} from 'react-bootstrap';
import './css/guest.css';
import GuestProfile from "./GuestProfileContainer";
import GuestFriends from "./GuestFriendsContainer";
import GuestRestaurants from "./GuestRestaurantsContainer";

import Logout from "./../Logout/LogoutContainer";

class Guest extends Component {

  constructor(props) {
    super(props);
	
		this.state = { key : "third" };
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	handleSelect(key) {
		this.setState({key : key});
	}
	
  render() {
    return (
    	<div>
				<Tab.Container id="tabs-with-dropdown" onSelect={this.handleSelect} activeKey={this.state.key}>
					<Row className="clearfix">
						<Col sm={12}>
							<Nav bsStyle="tabs">
								<NavItem eventKey="first"> Friends </NavItem>
								<NavItem eventKey="second"> Restaurants </NavItem>
								<NavItem eventKey="third"> My profile </NavItem>
								<Nav pullRight> <NavItem eventKey="fourth" >Log out</NavItem>
								</Nav>
							</Nav>
						</Col>
						<Col sm={12}>
							<Tab.Content animation>
								<Tab.Pane eventKey="first">
									<GuestFriends/>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<GuestRestaurants/>
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<GuestProfile/>
								</Tab.Pane>
								<Tab.Pane eventKey="fourth">
									 { this.state.key === "fourth" ? <Logout/> : null}
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
    );
  }
}

export default Guest;
