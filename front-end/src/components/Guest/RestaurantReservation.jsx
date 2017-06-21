// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Button } from 'react-bootstrap';
import { emptyThStyle } from './css/css'
import './css/guest.css';

class RestaurantReservation extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { restaurantOnReservation : props.restaurant, reservationStep : 1,
										dateTime: null, lunchHours: null, nonParsedDateTime: null};
		
		this.choseDateAndTime = this.choseDateAndTime.bind(this);
		this.selectTable = this.selectTable.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
		
		this.findLunchFriends = this.findLunchFriends.bind(this);
		
		this.makeLunchFriendsTable = this.makeLunchFriendsTable.bind(this);
		this.inviteLunchFriend = this.inviteLunchFriend.bind(this);
		this.makeRestaurantConfigurationTable = this.makeRestaurantConfigurationTable.bind(this);
	}
	
	inviteLunchFriend ( lunchFriend ) {
		console.log("invite lunchFriend");
		console.log(lunchFriend);
		
		this.props.inviteForLunch( this.state.restaurantOnReservation.id, this.state.nonParsedDateTime,
			this.state.lunchHours, lunchFriend, this.props.user.token);
	}
	
	makeInvitedLunchFriendsTable ( invitedFriend, index) {
		return <tr key={ index } id={ index } >
			<td>{invitedFriend.firstName}</td>
			<td>{invitedFriend.lastName}</td>
		</tr>
	}
	
	makeLunchFriendsTable (lunchFriend, index ) {
		return <tr key={ index } id={ index } >
			<td>{lunchFriend.firstName}</td>
			<td>{lunchFriend.lastName}</td>
			<td id="td-button"><Button bsStyle="success" style={{borderRadius: 0, width: 100 + '%'}} onClick={() =>  this.inviteLunchFriend(lunchFriend) }> Invite friend </Button></td>
		</tr>
	}
	
	findLunchFriends(e) {
		e.preventDefault();
		console.log("findLunchFriends");
		console.log(e.target.value);
		
		this.props.getLunchFriends(e.target.value , this.props.user.token);
	}
	
	nextStep() {
		this.setState({reservationStep : this.state.reservationStep + 1});
	}
	
	previousStep() {
		this.setState({reservationStep : this.state.reservationStep - 1});
	}
	
	getRestaurantsByName(e) {
		e.preventDefault();
		console.log("getRestaurantsByName");
		this.props.getRestaurantsByName(e.target.value, this.props.user.token);
	}
	
	choseDateAndTime() {
		console.log(this.state);
		let dateTime = document.getElementById("input-date-time").value;
		this.setState({nonParsedDateTime: dateTime});
		console.log(dateTime);
		
		let date = dateTime.split("T")[0];
		let time = dateTime.split("T")[1];
		let day = date.split("-")[2];
		let month = date.split("-")[1];
		let year = date.split("-")[0];
		let hours = time.split(":")[0];
		let minutes = time.split(":")[1];
		console.log("Konacno: " + day + "." + month + "." + year + ". " + hours + ":" + minutes);
		
		let lunchHours = document.getElementById("input-hour").value;
		console.log("lunchHours " + lunchHours);
		let dateTimeToState = day + "." + month + "." + year + ". " + hours + ":" + minutes;
		this.setState({reservationStep : this.state.reservationStep + 1, lunchHours: lunchHours,
			dateTime: dateTimeToState });
		
		console.log(this.state);
	}
	
	selectTable() {
		console.log("\nselectTable funkcija");
		
		this.setState({reservationStep : this.state.reservationStep + 1});
		
		console.log("this.state, a prije smo povecali reservation step za 1");
		console.log(this.state);
		
		this.props.getTableConfiguration(this.state.restaurantOnReservation, this.state.nonParsedDateTime,
			this.state.lunchHours, this.props.user.token);
		
	}
	
	makeRestaurantConfigurationTable (table, index ) {
		return <tr key={ index } id={ index } >
			<td id="td-button">
				{table.occupied ?
					<Button bsStyle="danger" style={{borderRadius: 0, width: 100 + '%'}}
									onClick={() => console.log(table) }> {table.occupied} </Button>
					:
					<Button bsStyle="success" style={{borderRadius: 0, width: 100 + '%'}}
									onClick={() => console.log(table) }> {table.occupied} </Button>
				}
			</td>
			
		</tr>
	}
	
	render() {
		const restaurant = this.state.restaurantOnReservation;
		
		const gettingLunchFriends = this.props.guest.gettingLunchFriends;
		const lunchFriends = this.props.guest.lunchFriends;
		const restaurantConfiguration = this.props.guest.restaurantConfiguration;
		return (
					<div className='panel panel-default'>
						<div>
						{
							this.state.reservationStep === 1 ?
								<table id="restaurants-reservation-table" style={{fontSize: 20 + 'px', width: "inherit", marginTop: 10 + 'px', border: '1px solid black'}} >
									<tbody><tr><td>Ime</td><td>{restaurant.name}</td></tr>
									<tr><td>Date and time</td>
										<td><input id='input-date-time' type='datetime-local' min='2017-06-30T09:00:00' /></td>
									</tr>
									<tr><td>Lasting</td>
										<td><input id='input-hour' type='number' min='1' max='10' step='0.5' defaultValue={1}/> hour(s)</td>
									</tr>
									<tr><td/><td><Button style={{width: 100 + '%', marginTop: 10 + 'px'}}
																			 onClick={this.choseDateAndTime}>Continue</Button></td></tr>
									</tbody>
								</table>
								:
								<table id="restaurants-reservation-table" style={{fontSize: 20 + 'px', width: "inherit", marginTop: 10 + 'px'}} >
									<tbody><tr><td>Name</td><td>{restaurant.name}</td></tr>
									<tr><td>Date and time</td>
										<td>{this.state.dateTime}</td>
									</tr>
									<tr><td>Lasting</td>
										<td>{this.state.lunchHours} hour(s)</td>
									</tr>
									</tbody>
								</table>
							
						}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{	this.state.reservationStep === 2 ?
								<div>
									<Button style={{marginTop: 10 + 'px'}} onClick={ this.previousStep }>Go back - Change entered data</Button>
									<Button style={{marginTop: 10 + 'px'}} onClick={ this.selectTable }> It's OK - Continue </Button>
								</div> :
								<h3> Table choosing </h3>
							}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
						{	this.state.reservationStep === 3 ?
							<div>
								{ restaurantConfiguration !== null && restaurantConfiguration !== undefined
									?
									<div> { console.log(restaurantConfiguration) }
										{ restaurantConfiguration.configuration.tables !== null &&
											restaurantConfiguration.configuration.tables !== undefined ?
											<table id="table-configuration">
												<tbody>
												<tr>
													<th>Tables</th>
												</tr>
												{ restaurantConfiguration.configuration.tables.map(this.makeRestaurantConfigurationTable) }
												</tbody>
											</table> : // restaurantConfiguration.configuration.tables !== null
											<h3> restaurantConfiguration.tables == null && restaurantConfiguration.tables == undefined</h3>
										}
										<Button style={{marginTop: 10 + 'px'}} onClick={ this.nextStep } > Continue </Button>
									</div>
									: // restaurantConfiguration !== null && restaurantConfiguration !== undefined
									<div>
										<h4> konfiguracija NULL ili UNDEFINED, a korak je 3 </h4>
									</div>
								}
							</div> // reservationStep === 3 ?
							: null
						}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{ this.state.reservationStep === 4 ?
								<div>
									<h3> Invite friends </h3>
										<div style={{marginLeft: 10 + 'px'}}>
											<div className='form-group'>
												Search your friends by name:
												<input id="input-lunch-friends" type="text" onChange={this.findLunchFriends}
															 style={{marginTop: 5 + 'px', marginLeft: 5 + 'px'}}/>
											</div>
										</div>
										{
											gettingLunchFriends ?
												<Loading/> :
												<table id="potential-friends-table">
													{
														lunchFriends !== undefined && lunchFriends.length > 0 ?
															<tbody><tr><th>Name</th><th>Last name</th><th>Invite</th></tr>
															{ lunchFriends.map(this.makeLunchFriendsTable) }
															</tbody>
															: <tbody><tr><th style={emptyThStyle}> Potential friends </th></tr></tbody>
													}
												</table>
										}
									<Button style={{marginTop: 10 + 'px'}} onClick={this.nextStep}> Continue </Button>
								</div>
								: null
							}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{ this.state.reservationStep >= 5 ?
							<div>
								<h3> Invited friends </h3>
								<table id="potential-friends-table">
									<tbody><tr><th>Name</th><th>Last name</th></tr>
										{ this.props.guest.invitedLunchFriends.map(this.makeInvitedLunchFriendsTable) }
									</tbody>
								</table>
							</div>
							: null
							}
						</div>
						<div className='panel-body'>
							{ this.state.reservationStep === 5 ? <Button onClick={() => this.setState({reservationStep: 1})}>
								Kraj - step na 1</Button> : <Loading/>}
						</div>
					</div>
		);
	}
}

export default RestaurantReservation;