/**
 * Created by Filip Savic on 05-Jun-17.
 */

// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col } from 'react-bootstrap';
import { buttonRowStyle, buttonStyle, emptyThStyle } from './css/css';
import './css/guest.css';

class GuestProfile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { key : 1 };
		
		this.getVisitedRestaurants = this.getVisitedRestaurants.bind(this);
		this.getRestaurantsByName = this.getRestaurantsByName.bind(this);
		// this.visitedRestaurants = this.visitedRestaurants.bind(this);
		
	}
	
	
	// visitedRestaurants() {
	// 	return this.props.restaurants.map(function (restaurant, index) {
	// 		return <tr key={ index }>
	// 			<td>{`${this.props.restaurants[index].name}`}</td>
	// 			<td>{`${this.props.restaurants[index].city}`}</td>
	// 			<td>{`667`}</td>
	// 		</tr>
	// 	});
	// }
	
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
	
	render() {
		const { restaurants , restaurantsByName , gettingVisitedRests, gettingRestsByName } = this.props.guest;
		return (
			<div>
				<Col xs={12} sm={12} md={6} lg={6}>
					<div className='panel panel-default'>
						<div className='panel-body'>
							<div className="panel panel-info">
								<Profile/>
								<div className="panel-footer">
									<div className="row">
										<div className="row" style={buttonRowStyle}>
											{
												gettingVisitedRests ? <Loading /> :
													<button className="btn btn-primary" type="button" onClick={this.getVisitedRestaurants}
																	style={buttonStyle}> Visited restaurants </button>
											}
										</div>
										<table id="visited-restaurants-table">
											{
												restaurants !== undefined && restaurants.length > 0 ?
													<tbody><tr><th>Name</th><th>City</th><th>Distance</th></tr>
													{ restaurants.map(function (restaurant, index) {
														return <tr key={ index }>
														<td>{`${restaurants[index].name}`}</td>
														<td>{`${restaurants[index].city}`}</td>
														<td>{`667`}</td>
														</tr>
													}) }
													</tbody>
													: <tbody><tr><th style={emptyThStyle} > All visited restaurants </th></tr></tbody>
											}
										</table>
										<br/>
										<div style={{marginLeft: 10 + 'px'}}>
											<div className='form-group'>
												Filter by name:
												<input id="input-restaurants-by-name" type="text" onChange={this.getRestaurantsByName}/>
											</div>
										</div>
										{
											gettingRestsByName ?
												<Loading/> :
												<table id="restaurants-table">
													{
														restaurantsByName !== undefined && restaurantsByName.length > 0 ?
															<tbody>
															<tr>
																<th>Name</th>
																<th>City</th>
																<th>Distance</th>
															</tr>
															{ restaurantsByName.map(function (restaurant, index) {
																return <tr key={ index }>
																	<td>{`${restaurantsByName[index].name}`}</td>
																	<td>{`${restaurantsByName[index].city}`}</td>
																	<td>{`667`}</td>
																</tr>
															}) }
															</tbody>
															: <tbody><tr><th style={emptyThStyle} > All visited restaurants </th></tr></tbody>
													}
												</table>
										}
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
