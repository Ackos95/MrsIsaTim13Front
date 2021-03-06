// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import RestaurantReservation from './RestaurantReservationContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Button } from 'react-bootstrap';
import { emptyThStyle , tdStyle} from './css/css'
import './css/guest.css';

class GuestRestaurants extends Component {
	
	constructor(props) {
		super(props);
		
		// this.state = { restaurantOnReservation : null };
		
		this.getRestaurantsByName = this.getRestaurantsByName.bind(this);
		this.restaurantsByNameTable = this.restaurantsByNameTable.bind(this);
		
	}
	
	getRestaurantsByName(e) {
		e.preventDefault();
		console.log("getRestaurantsByName");
		this.props.getRestaurantsByName(e.target.value, this.props.user.token);
	}
	
	reserveRestaurant(restaurant) {
		this.props.startRestaurantReservation(restaurant);
		// this.setState({restaurantOnReservation: restaurant});
	}
	
	restaurantsByNameTable (restaurant, index) {
		return <tr key={index} id={ index }>
			<td style={tdStyle}>{`${restaurant.name}`}</td>
			<td style={tdStyle}>{`${restaurant.city}`}</td>
			<td style={tdStyle}>{`${restaurant.description}`}</td>
			<td style={tdStyle}>{`667`}</td>
			<td><Button onClick={ () => this.reserveRestaurant(restaurant)} style={{width: 100 + '%'}}> Rezerviši </Button></td>
		</tr>
	}
	
	
	render() {
		const { gettingRestsByName, restaurantsByName, restaurantOnReservation } = this.props.guest;
		return (
			<div>
				<Col xs={12} sm={12} md={6} lg={6}>
					<div className='panel panel-default'>
						{
							restaurantOnReservation !== null ?
								<RestaurantReservation restaurant={restaurantOnReservation} />
								:
								<div className='panel-body'>
									<div style={{marginLeft: 10 + 'px'}}>
										<div className='form-group'>
											Filter by name:
											<input id="input-restaurants-by-name" type="text" onChange={this.getRestaurantsByName}
														 style={{marginLeft: 5 + 'px'}}/>
										</div>
									</div>
									{
										gettingRestsByName ?
											<Loading/> :
											<table id="restaurants-table">
												{
													restaurantsByName !== undefined && restaurantsByName.length > 0 ?
														<tbody><tr><th>Ime</th><th>Grad</th><th>Opis</th><th>Udaljenost</th><th/></tr>
														{ restaurantsByName.map(this.restaurantsByNameTable) }
														</tbody>
														: <tbody>
													<tr>
														<th style={emptyThStyle}>All restaurants</th>
													</tr>
													</tbody>
												}
											</table>
									}
									<br/>
								</div>
						}
					</div>
				</Col>
			</div>
		);
	}
}

export default GuestRestaurants;
