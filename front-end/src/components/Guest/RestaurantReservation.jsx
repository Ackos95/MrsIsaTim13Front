// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Tables from '../Manager/RestaurantManagement/TablesContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Button } from 'react-bootstrap';
import { emptyThStyle } from './css/css'
import './css/guest.css';
import DrinkAndMealChooser from "./../common/Checkbox/DrinkAndMealChooser"

class RestaurantReservation extends Component {
	
	constructor(props) {
		super(props);
		
		// treba mi jer JsonMapper na serveru ne može da parsira "token" atribut user-a
		let currentUser = this.props.user;
		console.log("\nconsole.log(currentUser);");
		console.log(currentUser);
		console.log("console.log(currentUser);\n");
		
		let noTokenUser = { id: currentUser.id, email: currentUser.email, firstName: currentUser.firstName,
		lastName: currentUser.lastName, userName: currentUser.userName, roles: currentUser.roles };
		
		this.state = { restaurantOnReservation : props.restaurant, reservationStep : 1,
										dateTime: null, lunchHours: null, nonParsedDateTime: null, noTokenUser: noTokenUser};
		
		this.choseDateAndTime = this.choseDateAndTime.bind(this);
		this.getTableConfiguration = this.getTableConfiguration.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
		
		this.findLunchFriends = this.findLunchFriends.bind(this);
		
		this.makeLunchFriendsTable = this.makeLunchFriendsTable.bind(this);
		this.inviteLunchFriend = this.inviteLunchFriend.bind(this);
		
		this.startOver = this.startOver.bind(this);
		this.reloadTableConfig = this.reloadTableConfig.bind(this);
		
		this.tryToReserveTable = this.tryToReserveTable.bind(this);
		
		this.endReservation = this.endReservation.bind(this);
	}
	
	tryToReserveTable(selectedTablesId) {
		console.log("\n\ntryToReserveTable\n");
		
		console.log("console.log(selectedTablesId);");
		console.log(selectedTablesId);
		
		let selectedTableArray = this.props.guest.restaurantConfiguration.configuration.tables;
		
		const selectedTables = selectedTablesId.map((id) => selectedTableArray.find((table) => table.id === id));
		console.log(selectedTables);
		
		// tableIdList, reservationDate, reservationHours, token
		this.props.tryToReserveTable( selectedTables, this.state.nonParsedDateTime,
			this.state.lunchHours, this.props.user.token );
		
		this.setState({reservationStep : this.state.reservationStep + 1});
	}
	
	endReservation() {
		this.props.endRestaurantReservation();
		this.setState({reservationStep : 1});
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
		console.log();
		console.log(this.props);
		console.log(this.state);
		console.log();
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
		
		// dateTime =dateTime + ":00+0200";
		let myDate = new Date(dateTime);
		//let offset = myDate.getTimezoneOffset() * 60 * 1000;
		// myDate.getTime() MINUS offset jer je offset negativan broj minuta koliko moja veremenska zona kasni za UTC 00:00, dakle (-)120
		let result = myDate.getTime();
		
		let lunchHours = document.getElementById("input-hour").value;
		console.log("lunchHours " + lunchHours);
		let dateTimeToState = day + "." + month + "." + year + ". " + hours + ":" + minutes;
		this.setState({reservationStep : this.state.reservationStep + 1, lunchHours: lunchHours,
			dateTime: dateTimeToState, dateTimeInMiliseconds : result });
		
		console.log("\n iz RestaurantReservation.jsx - choseDateAndTime - console.log(this.state) ");
		console.log(this.state);
	}
	
	getTableConfiguration() {
		console.log("\ngetTableConfiguration funkcija");
		
		this.setState({reservationStep : this.state.reservationStep + 1});
		
		console.log("this.state, a prije smo povecali reservation step za 1");
		console.log(this.state);
		
		this.props.getTableConfiguration(this.state.restaurantOnReservation, this.state.nonParsedDateTime,
			this.state.lunchHours, this.props.user.token);
		
	}
	
	startOver() {
		this.setState({reservationStep : 1});
		this.props.resetTableConfigError();
	}
	
	reloadTableConfig() {
		console.log("\ngetTableConfiguration funkcija");
		
		this.props.resetTableConfigError();
		
		this.setState({reservationStep : 3});
		console.log("this.state, a prije smo povecali reservation step za 1");
		console.log(this.state);
		
		this.props.getTableConfiguration(this.state.restaurantOnReservation, this.state.nonParsedDateTime,
			this.state.lunchHours, this.props.user.token);
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
									<tbody><tr><td>Restaurant name</td><td>{restaurant.name}</td></tr>
									<tr><td>Date and time</td>
										<td><input id='input-date-time' type='datetime-local' min='2017-06-30T09:00:00' /></td>
									</tr>
									<tr><td>Lasting</td>
										<td><input id='input-hour' type='number' min='1' max='10' step='1' defaultValue={1}/> hour(s)</td>
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
									<Button style={{marginTop: 10 + 'px', marginRight: 5 + 'px'}}
													onClick={ this.previousStep }>Go back - Change entered data</Button>
									<Button style={{marginTop: 10 + 'px', marginLeft: 5 + 'px'}}
													onClick={ this.getTableConfiguration }> It's OK - Continue </Button>
								</div> :
								<h3> Table choice </h3>
							}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{
								this.props.guest.tableReservationError === true
									?
										<div style={{ display: 'flex', justifyContent: 'center' }} >
											<h2>Someone has occupied one of the table you tried to reserve. <br/> You can: </h2>
											<Button onClick={ this.reloadTableConfig }> Reload table configuration </Button>
											<Button onClick={ this.startOver } >
												Change date, time or lasting of your reservation. </Button>
										</div>
									:
										<div>
											{	this.state.reservationStep === 3
												?
													<div>
														{ restaurantConfiguration !== null && restaurantConfiguration !== undefined
															?
															<div>
																<Tables editing={false} reonFilter={null} />
																<Button style={{marginTop: 10 + 'px'}}
																				onClick={ () => this.tryToReserveTable(this.props.selectedTablesId) } >
																	Continue </Button>
															</div>
															:
															<div>
																<h4> Loading config </h4>
																<Loading/>
															</div>
														}
													</div>
												: null
											}
										</div>
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
									{ this.props.guest.invitedLunchFriends.length > 0 ?
										<tbody>
											<tr><th>Name</th><th>Last name</th></tr>
											{ this.props.guest.invitedLunchFriends.map(this.makeInvitedLunchFriendsTable) }
										</tbody>
										:
										<tbody><tr><th style={emptyThStyle}> No friends are invited </th></tr></tbody>
										}
								</table>
							</div>
							: null
							}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{ this.state.reservationStep === 5 ?
								<div>
									<h3> Order your food and drink before you come? </h3>
									<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
										<Button style={{marginTop: 10 + 'px', marginRight: 5 + 'px'}}
														onClick={ this.nextStep }> Yes </Button>
										<Button style={{marginTop: 10 + 'px', marginLeft: 5 + 'px'}}
														onClick={ () => this.setState({'reservationStep': 7}) } > No </Button>
									</div>
								</div>
							:
								null
							}
						</div>
						<div style={{marginLeft: 10 + 'px'}} >
							{ this.state.reservationStep === 6 ?
								<div>
									<DrinkAndMealChooser ref="drinkAndMealChooser"
																				lunchGuest={this.state.noTokenUser}
																				timeStamp={this.state.dateTimeInMiliseconds}
																				restaurant={this.state.restaurantOnReservation}
																				sendMealOrder={this.props.sendMealOrder} />
								</div>
								:
								null
							}
						</div>
						{/* e n d  - - -     kliknuo je YES ii došao do kraja u drinkAndMealChooser-u  ILI  kliknuo NO */}
						{ this.state.reservationStep === 7 || this.props.guest.lunchOrderSuccess === "OK valjda" ?
							<div className='panel-body' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
								<Button style={{ marginTop: 10 + 'px'}} onClick={ this.endReservation }>
									Finish
								</Button>
							</div>
							:
							null
						}
					</div>
		);
	}
}

export default RestaurantReservation;