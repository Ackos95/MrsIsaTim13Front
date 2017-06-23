
// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

import moment from 'moment';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Button } from 'react-bootstrap';
import { buttonRowStyle, buttonStyle, emptyThStyle , tdStyle } from './css/css';
import './css/guest.css';

import Reactable from 'reactable';

var Table = Reactable.Table,
	Tr = Reactable.Tr,
	Td = Reactable.Td;


class GuestProfile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { key : 1 };
		
		this.getVisitedRestaurants = this.getVisitedRestaurants.bind(this);
		this.getRestaurantsByName = this.getRestaurantsByName.bind(this);
		this.makeFriendRequestTable = this.makeFriendRequestTable.bind(this);
		this.getFriendRequests = this.getFriendRequests.bind(this);
		this.acceptFriend = this.acceptFriend.bind(this);
		this.declineFriend = this.declineFriend.bind(this);
		this.removeFriendRequest = this.removeFriendRequest.bind(this);
		
	}
	
	getRestaurantsByName(e) {
		e.preventDefault();
		console.log("getRestaurantsByName");
		console.log(this.props.user);
		
		this.props.getRestaurantsByName(e.target.value, this.props.user.token);
		
		console.log(document.getElementById("input-restaurants-by-name"));
	}
	
	getVisitedRestaurants(e) {
		e.preventDefault();
		console.log(this.props.user);
		console.log(this.props.user.token);
		this.props.getVisitedRestaurants(this.props.user.token);
	}
	
	removeFriendRequest(friendRequest) {
		console.log("removeFriendRequest");
		this.props.removeFriendRequest(friendRequest);
	}
	
	acceptFriend(friendRequest) {
		console.log("acceptFriend");
		console.log(friendRequest);
		this.props.removeFriendRequest(friendRequest);
		this.props.acceptFriend(friendRequest, this.props.user.token);
	}
	
	declineFriend(friendRequest) {
		console.log("declineFriend");
		console.log(friendRequest);
		this.props.removeFriendRequest(friendRequest);
		this.props.declineFriend(friendRequest, this.props.user.token);
	}
	
	makeFriendRequestTable (friendRequest, index ) {
		return <tr key={ index } id={ index } >
			<td>{friendRequest.firstName}</td>
			<td>{friendRequest.lastName}</td>
			<td><Button bsStyle="success" style={{width: 100 + '%', borderRadius: 0}} onClick={() => this.acceptFriend(friendRequest)}>
				Accept </Button></td>
			<td><Button bsStyle="danger" style={{width: 100 + '%', borderRadius: 0}} onClick={() => this.declineFriend(friendRequest)}>
				Decline </Button></td>
		</tr>
	}
	
	getFriendRequests() {
		console.log("getFriendRequests");
		this.props.getFriendRequests(this.props.user.token);
	}
	
	componentDidMount() {
		this.getFriendRequests();
	}
	
	
	render() {
		const { restaurants , gettingVisitedRests, friendRequests, gettingFriendRequests } = this.props.guest;
		return (
			<div>
				<Col xs={12} sm={12} md={6} lg={6}>
					<div className='panel panel-default'>
						<div className='panel-body'>
							<Profile isEditable={true} />
							<div className="panel panel-info">
							{
								gettingFriendRequests ? <Loading/> :
									<table id="friend-requests-table">
											<caption style={{minWidth: 140 + 'px', fontSize: 20 + 'px'}}>Friend requests</caption>
										{
											friendRequests !== undefined && friendRequests.length > 0 ?
												<tbody id="friend-requests-tbody">
												<tr>
													<th>Name</th>
													<th>Last name</th>
													<th colSpan={2}>Response</th>
												</tr>
												{ friendRequests.map(this.makeFriendRequestTable) }
												</tbody>
												: <tbody>
											<tr>
												<th style={emptyThStyle}> No friend requests</th>
											</tr>
											</tbody>
										}
									</table>
								}
								<div className="panel-footer">
									<div className="row">
										<div className="row" style={buttonRowStyle}>
											{
												gettingVisitedRests ? <Loading /> :
													<button className="btn btn-primary" type="button" onClick={this.getVisitedRestaurants}
																	style={buttonStyle}> Visited restaurants </button>
											}
										</div>
										{/*<Table/>*/}
										{/*<Table className="table" data={restaurants} />*/}
										<table id="visited-restaurants-table">
											{
												restaurants !== undefined && restaurants.length > 0 ?
													<Table className="table" id="table" sortable={true}>
														{ restaurants.map(function (restaurant, index) {
															return <Tr key={ index } >
																<Td column="Name">{`${restaurant.restaurant.name}`}</Td>
																<Td column="City">{`${restaurant.restaurant.city}`}</Td>
																<Td column="Description">{`${restaurant.restaurant.description}`}</Td>
																<Td column="Date">{moment(restaurant.visitDate).format('DD.MM.YYYY. HH:mm')}</Td>
															</Tr>
															
														}) }
													</Table>
													:
													<h3> All visited restaurants </h3>
											}
										</table>
										<br/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default GuestProfile;
