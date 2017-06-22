import React, { Component } from 'react';
import Checkbox from './Checkbox';

import './../../Guest/css/guest.css';

class DrinkAndMealChooser extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { invitationStep : 2 };
		
		console.log("DrinkAndMealChooser kompoent. props");
		console.log(this.props);
		
		this.endInvitationResponse = this.endInvitationResponse.bind(this);
		
		this.printState = this.printState.bind(this);
	}
	
	printState() {
		console.log("console.log(this.state);");
		console.log(this.state);
	}
	
	endInvitationResponse() {
		console.log("endInvitationResponse");
		console.log("\nendInvitationResponse");
		
		this.setState({invitationStep: 123});
		
		let mealOrder = { guest: this.props.lunchGuest,
			timeStamp: this.props.timeStamp, meals: this.state.finallyBoughtMeals,
			drinks: this.state.finallyBoughtDrinks, restaurant: this.props.restaurant};
		
		console.log(mealOrder);
		
		this.props.sendMealOrder(mealOrder);
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
			{this.props.restaurant.drinksMenu.map(this.createDrinkCheckbox)}
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
			{this.props.restaurant.mealsMenu.map(this.createMealCheckbox)}
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

	render() {
		return (
			<div>
			{ this.state.invitationStep !== 123 ?
				<div>
					<div>
						{ this.state.invitationStep === 2 ?
							<div>
								<h3 style={{textAlign: 'center'}} > Order a drink </h3>
								<h4 style={{textAlign: 'center'}} >
									If you don't want a drink, you don't have to choose anything. Just click on Save.
								</h4>
								<form onSubmit={this.handleDrinkFormSubmit}>
									{this.createDrinkCheckboxes()}
									<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
										<button className="btn btn-default" type="submit"> Save </button>
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
							<h3 style={{textAlign: 'center'}} > Ordered drink(s) </h3>
							{this.createBoughtDrinksTable()}
						</div>
						: null
					}
					</div>
					<div>
						{ this.state.invitationStep === 3 ?
							<div>
								<h3 style={{textAlign: 'center'}} > Order some food </h3>
								<h4 style={{textAlign: 'center'}} >
									If you don't want any food, you don't have to choose anything. Just click on Save.
								</h4>
								<form onSubmit={this.handleMealFormSubmit}>
									{this.createMealCheckboxes()}
									<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
										<button className="btn btn-default" type="submit"> Save </button>
									</div>
								</form>
							</div>
							: null
						}
					</div>
					<div>
						{ this.state.invitationStep >= 4 ?
							<div>
								<h3 style={{textAlign: 'center'}} > Ordered food </h3>
								{this.createBoughtMealsTable()}
							</div>
							: null
						}
					</div>
				
					{ this.state.invitationStep === 4 ?
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
							<button className="btn btn-success btn-lg"
											onClick={() => this.endInvitationResponse()} > Make food order </button>
						</div>
						: null
					}
				</div>
			:
				<div>
				<h2 style={{textAlign: 'center'}} > You have successfully selected your meal </h2>
					<div>
						<h3 style={{textAlign: 'center'}} > Ordered drink(s) </h3>
						{this.createBoughtDrinksTable()}
						<h3 style={{textAlign: 'center'}} > Ordered food </h3>
						{this.createBoughtMealsTable()}
					</div>
				</div>
			}
		</div>
		)
	}
	
}

export default DrinkAndMealChooser;