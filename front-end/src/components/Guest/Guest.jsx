// Guest profile page

import React, { Component } from 'react';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Nav, Row,  Tab, NavItem} from 'react-bootstrap';
import './css/guest.css';
import GuestProfile from "./GuestProfileContainer";
import GuestFriends from "./GuestFriendsContainer";

class Guest extends Component {

  constructor(props) {
    super(props);
	
		this.state = { key : 1 };
	}
	
  render() {
    return (
    	<div>
				<Tab.Container id="tabs-with-dropdown" defaultActiveKey="third">
					<Row className="clearfix">
						<Col sm={12}>
							<Nav bsStyle="tabs">
								<NavItem eventKey="first"> Prijatelji </NavItem>
								<NavItem eventKey="second"> Restorani </NavItem>
								<NavItem eventKey="third"> Moj profil </NavItem>
								<Nav pullRight> <NavItem eventKey={1} href="#">Log out</NavItem>
								</Nav>
							</Nav>
						</Col>
						<Col sm={12}>
							<Tab.Content animation>
								<Tab.Pane eventKey="first">
									<GuestFriends/>
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									Restorani komponenta
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<GuestProfile/>
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
