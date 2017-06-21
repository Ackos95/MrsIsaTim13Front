import React, { Component } from 'react';
import Checkbox from './../common/Checkbox/Checkbox';

import { Col , Button } from 'react-bootstrap';
import { buttonRowStyle } from './css/css'
import './css/guest.css';

class LunchInvitation extends Component {
	
	constructor(props) {
		super(props);
		
		console.log("Props LunchInvitation komponente: ");
		console.log(props);
		
		// ?invitationId=1
		console.log("\nprops.location.search");
		console.log(props.location.search);
		let fullPath = props.location.search.split("&");
		let invitationId = fullPath[0].slice(14);
		
		console.log("kraj konstruktora");
		
		this.state = { invitationId: invitationId, invitationStep : 1 };
		
		this.getInvitationInfo = this.getInvitationInfo.bind(this);
		
		this.acceptInvitation = this.acceptInvitation.bind(this);
		this.declineInvitation = this.declineInvitation.bind(this);
		
		this.endInvitationResponse = this.endInvitationResponse.bind(this);
		
		this.printState = this.printState.bind(this);
	}
	
	printState() {
		console.log("console.log(this.props.guest.lunchInvitation);");
		console.log(this.props.guest.lunchInvitation);
		console.log("console.log(this.state);");
		console.log(this.state);
	}
	
	endInvitationResponse() {
		console.log("endInvitationResponse");
		console.log("\nendInvitationResponse");
		
		let mealOrder = { guest: this.props.guest.lunchInvitation.lunchGuest, timeStamp: this.props.guest.lunchInvitation.realDate,
											meals: this.state.finallyBoughtMeals, drinks: this.state.finallyBoughtDrinks };
		
		console.log(mealOrder);
		
		this.props.sendMealOrder(mealOrder);
	}
	
	declineInvitation() {
		this.setState({invitationStep: 0});
		this.props.declineLunchInvitation(this.props.guest.lunchInvitation.id);
	}
	
	acceptInvitation() {
		this.setState({invitationStep: 2});
		this.props.acceptLunchInvitation(this.props.guest.lunchInvitation.id);
	}
	
	getInvitationInfo() {
		console.log("getInvitationInfo za invitationId");
		console.log(this.state.invitationId);
		
		this.props.getLunchInvitationInfo(this.state.invitationId);
	}
	
	/** C H E C K B O X E S - - - C H E C K B O X E S - - - C H E C K B O X E S */
	/** http://react.tips/checkboxes-in-react/ */
	
	/** Drinks checkbox - tables - START */
	
	handleDrinkFormSubmit = formSubmitEvent => {
		formSubmitEvent.preventDefault();
		
		this.setState({invitationStep: this.state.invitationStep + 1});
		
		let finallyBoughtDrinks = [];
		for (const checkbox of this.boughtDrinks) {
			finallyBoughtDrinks.push(checkbox);
			console.log(checkbox, '\n drink.');
		}
		
		console.log("console.log(finallyBoughtDrinks);");
		console.log(finallyBoughtDrinks);
		this.setState({finallyBoughtDrinks: finallyBoughtDrinks});
	};
	
	toggleDrinkCheckbox = drink => {
		if (this.boughtDrinks.has(drink)) {
			this.boughtDrinks.delete(drink);
		} else {
			this.boughtDrinks.add(drink);
		}
	};
	
	createDrinkCheckbox = drink => (
		<tr key={drink.id}>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {drink.name} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {drink.description} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} >
				<Checkbox
					drink={drink}
					handleCheckboxChange={this.toggleDrinkCheckbox}
				/>
			</td>
		</tr>
	);
	
	createDrinkCheckboxes = () => (
		<table style={{margin: 'auto', border: 0 + 'px'}}>
			<tbody>
			{this.props.guest.lunchInvitation.restaurant.drinksMenu.map(this.createDrinkCheckbox)}
			</tbody>
		</table>
	);
	
	createBoughtDrinksRow = drink => (
		<tr key={drink.id}>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {drink.name} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {drink.description} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {drink.price} </td>
		</tr>
	);
	
	createBoughtDrinksTable = () => (
		<table style={{margin: 'auto', border: 0 + 'px'}}>
			<tbody>
			{this.state.finallyBoughtDrinks.map(this.createBoughtDrinksRow)}
			</tbody>
		</table>
	);
	
	/** Drinks checkbox - tables - END */
	
	/** Meals checkbox - tables - START */
	
	handleMealFormSubmit = formSubmitEvent => {
		formSubmitEvent.preventDefault();
		
		this.setState({invitationStep: this.state.invitationStep + 1});
		
		let finallyBoughtMeals = [];
		for (const checkbox of this.boughtMeals) {
			finallyBoughtMeals.push(checkbox);
			console.log(checkbox, ' \n meal.');
		}
		
		console.log("console.log(finallyBoughtMeals);");
		console.log(finallyBoughtMeals);
		this.setState({finallyBoughtMeals: finallyBoughtMeals});
	};
	
	toggleMealCheckbox = meal => {
		if (this.boughtMeals.has(meal)) {
			this.boughtMeals.delete(meal);
		} else {
			this.boughtMeals.add(meal);
		}
	};
	
	createMealCheckbox = meal => (
		<tr key={meal.id}>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {meal.name} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {meal.description} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} >
				<Checkbox
					drink={meal}
					handleCheckboxChange={this.toggleMealCheckbox}
				/>
			</td>
		</tr>
	);
	
	createMealCheckboxes = () => (
		<table style={{margin: 'auto', border: 0 + 'px'}}>
			<tbody>
			{this.props.guest.lunchInvitation.restaurant.mealsMenu.map(this.createMealCheckbox)}
			</tbody>
		</table>
	);
	
	createBoughtMealsRow = meal => (
		<tr key={meal.id}>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {meal.name} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {meal.description} </td>
			<td style={{textAlign: 'center', border: 0 + 'px'}} > {meal.price} </td>
		</tr>
	);
	
	createBoughtMealsTable = () => (
		<table style={{margin: 'auto', border: 0 + 'px'}}>
			<tbody>
			{this.state.finallyBoughtMeals.map(this.createBoughtMealsRow)}
			</tbody>
		</table>
	);
	
	/** Meals checkbox - tables - END */
	
	componentWillMount = () => {
		this.boughtDrinks = new Set();
		this.boughtMeals = new Set();
	};
	
	componentDidMount() {
		this.getInvitationInfo();
	}
	
	render() {
		const lunchInvitation = this.props.guest.lunchInvitation;
		
		return (
			<div>
				<Col xs={12} sm={12} md={12} lg={12}>
					<div className='panel panel-default'>
						<div className='panel-body'>
							{ this.state.invitationStep === -1 ?
								<h1 style={{textAlign: 'center'}} > Odbili ste poziv na zajednički obrok
									sa {lunchInvitation.lunchHost.firstName} {lunchInvitation.lunchHost.lastName}.</h1>
								:
								<div>
									<h2 style={{textAlign: 'center'}} > Dobrodošli na stranicu za potvrdu poziva za obrok </h2>
									{ lunchInvitation !== null && lunchInvitation !== undefined ?
										<div>
											<h3 style={{textAlign: 'center'}} > Pozvani ste u restoran {lunchInvitation.restaurant.name}.</h3>
											<h3 style={{textAlign: 'center'}} > Pozvao Vas je naš dragi gost, {lunchInvitation.lunchHost.firstName} {lunchInvitation.lunchHost.lastName}.</h3>
											<h3 style={{textAlign: 'center'}} > Pozvani ste { lunchInvitation.lunchDate } u { lunchInvitation.lunchHour } </h3>
											<h3 style={{textAlign: 'center'}} > na obrok u trajanju od {lunchInvitation.reservationHours} sata.</h3>
										</div>
										: <h3 style={{textAlign: 'center'}} > Došlo je do greške prilikom učitavanja zahtjeva. </h3>
									}
									<div className="row" style={buttonRowStyle}>
										<button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="btn btn-primary btn-xs"
														type="button" onClick={this.printState} > Pointless button </button>
									</div>
									{ this.state.invitationStep === 1 ?
										<table style={{margin: 'auto'}}>
											<tbody>
											<tr style={{border: 0}}><td colSpan={2} style={{textAlign: 'center', border: 0}}>
												<Button bsSize="large" bsStyle="success" style={{marginRight: 5 + 'px'}}
																onClick={this.acceptInvitation} > Dolazim </Button>
												<Button bsSize="large" bsStyle="danger" style={{marginLeft: 5 + 'px'}}
																onClick={this.declineInvitation} > Ne dolazim </Button></td>
											</tr>
											</tbody>
										</table>
										: null
									}
									{ this.state.invitationStep === 0 ?
										<h2 style={{textAlign: 'center'}} > Odbili ste poziv. </h2>
										: null
									}
								</div>
							}
							{/*this.sate.invitationStep === -1*/}
							<div>
								{ this.state.invitationStep === 2 ?
									<div>
										<h3 style={{textAlign: 'center'}} > Poručite neko piće </h3>
										<h4 style={{textAlign: 'center'}} >
											Ako ne želite piće, ne morate ništa odabrati. Samo kliknite na Sačuvaj.
										</h4>
										<form onSubmit={this.handleDrinkFormSubmit}>
											{this.createDrinkCheckboxes()}
											<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
												<button className="btn btn-default" type="submit"> Sačuvaj </button>
											</div>
										</form>
									</div>
									:
									null
								}
							</div>
							<div>
								{ this.state.invitationStep >= 3 ?
									<div>
										<h3 style={{textAlign: 'center'}} > Poručeno piće </h3>
										{this.createBoughtDrinksTable()}
									</div>
									: null
								}
							</div>
							<div>
								{ this.state.invitationStep === 3 ?
									<div>
										<h3 style={{textAlign: 'center'}} > Poručite neku hranu </h3>
										<h4 style={{textAlign: 'center'}} >
											Ako ne želite hranu, ne morate ništa odabrati. Samo kliknite na Sačuvaj.
										</h4>
										<form onSubmit={this.handleMealFormSubmit}>
											{this.createMealCheckboxes()}
											<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
												<button className="btn btn-default" type="submit"> Sačuvaj </button>
											</div>
										</form>
									</div>
									: null
								}
							</div>
							<div>
								{ this.state.invitationStep >= 4 ?
									<div>
										<h3 style={{textAlign: 'center'}} > Poručena hrana </h3>
										{this.createBoughtMealsTable()}
									</div>
									: null
								}
							</div>
							
							{ this.state.invitationStep === 4 ?
								<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
									<button className="btn btn-success btn-lg"
													onClick={() => this.endInvitationResponse()} > Završi </button>
								</div>
								: null
							}
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default LunchInvitation;
