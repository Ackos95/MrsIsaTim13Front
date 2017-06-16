// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Button } from 'react-bootstrap';
import './css/guest.css';

class RestaurantReservation extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { restaurantOnReservation : props.restaurant, reservationStep : 1,
										dateTime: null, lunchHours: null};
		
		this.choseDateAndTime = this.choseDateAndTime.bind(this);
		this.selectTable = this.selectTable.bind(this);
	}
	
	getRestaurantsByName(e) {
		e.preventDefault();
		console.log("getRestaurantsByName");
		this.props.getRestaurantsByName(e.target.value, this.props.user.token);
	}
	
	choseDateAndTime() {
		console.log(this.state);
		let dateTime = document.getElementById("input-date-time").value;
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
		console.log("selectTable");
		console.log("this.state");
		console.log(this.state);
	}
	
	render() {
		// const { gettingRestsByName, restaurantsByName } = this.props.guest;
		const restaurant = this.state.restaurantOnReservation;
		return (
					<div className='panel panel-default'>
							<div>
							{
								this.state.reservationStep === 1 ?
									<table id="restaurants-reservation-table" style={{fontSize: 20 + 'px', width: "inherit", marginTop: 10 + 'px', border: '1px solid black'}} >
										<tbody><tr><td>Ime</td><td>{restaurant.name}</td></tr>
										<tr><td>Datum i vrijeme</td>
											<td><input id='input-date-time' type='datetime-local' min='2017-06-30T09:00:00' /></td>
										</tr>
										<tr><td>Trajanje</td>
											<td><input id='input-hour' type='number' min='1' max='10' step='0.5' defaultValue={1}/> sata</td>
										</tr>
										<tr><td/><td><Button style={{width: 100 + '%'}} onClick={this.choseDateAndTime}>Dalje</Button></td></tr>
										</tbody>
									</table>
									:
									<table id="restaurants-reservation-table" style={{fontSize: 20 + 'px', width: "inherit", marginTop: 10 + 'px'}} >
										<tbody><tr><td>Ime</td><td>{restaurant.name}</td></tr>
										<tr><td>Datum i vrijeme</td>
											<td>{this.state.dateTime}</td>
										</tr>
										<tr><td>Trajanje</td>
											<td>{this.state.lunchHours} sat(a)</td>
										</tr>
										</tbody>
									</table>
								
							}
							</div>
							<div>
							{	this.state.reservationStep === 2 ?
								<div>
									<Button onClick={this.selectTable}>Popravite unijete podatke</Button>
									<Button onClick={() => this.setState({reservationStep : this.state.reservationStep + 1}) }>Dalje</Button>
								</div> :
								<h2>Odabir stola</h2> }
							</div>
							<div>
							{	this.state.reservationStep === 3 ?
								<Button onClick={() => this.setState({reservationStep : this.state.reservationStep + 1})}>Korak 4</Button> :
								<h2>nije 3</h2> }
							</div>
						<div className='panel-body'>
							{ this.state.reservationStep === 4 ? <Button onClick={() => this.setState({reservationStep: 1})}>
								Kraj - step na 1</Button> : <Loading/>}
						</div>
					</div>
		);
	}
}

export default RestaurantReservation;