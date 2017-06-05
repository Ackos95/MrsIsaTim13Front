// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col, Nav, Row,  Tab, NavItem} from 'react-bootstrap';
import { buttonRowStyle, buttonStyle} from './css/css'
import './css/guest.css';

class Guest extends Component {

  constructor(props) {
    super(props);
	
		this.state = { key : 1 };
		
    this.changeName = this.changeName.bind(this);
		this.getVisitedRestaurants = this.getVisitedRestaurants.bind(this);
		this.getRestaurantsByName = this.getRestaurantsByName.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		// this.state = { guest : props.guest, user : props.user, inProgress : props.inProgress, key : 2};
		
	}
		
  changeName(e) {
    e.preventDefault();

    this.props.changeName(e.target.value);
  }
	
  handleSelect(key) {
		this.setState({key: key}) /*setState({key: {key}})*/;
	}
  
  getRestaurantsByName(e) {
		e.preventDefault();
		console.log("getRestaurantsByName");
		console.log(this.props.user);
		
		this.props.getRestaurantsByName(e.target.value, this.props.user.token);
		
		console.log(document.getElementById("input-restaurants-by-name"));
			// .value = 'asd';
		
		// console.log("imenu po restoraani po imenu");
		// console.log(this.props.guest.restaurantsByName);
		// console.log(this.props.guest.restaurantsByName.length);
	}
  
	getVisitedRestaurants(e) {
  	e.preventDefault();
  	console.log(this.props.user);
		console.log(this.props.user.token);
  	this.props.getVisitedRestaurants(this.props.user.token);

		// console.log("restoraani");
		// console.log(this.props.guest.restaurants);
		// console.log(this.props.guest.restaurants.length);
	}

  render() {
    const { restaurants , restaurantsByName , gettingVisitedRests, gettingRestsByName } = this.props.guest;
		// var visitedRestaurants = restaurants.map(function(restaurant, index){
		// 	return <tr key={ index }>
		// 		<td>{`${restaurants[index].name}`}</td>
		// 		<td>{`${restaurants[index].city}`}</td>
		// 		<td>{`667`}</td>
		// 	</tr>
		// });
		
		// React Bootstrap
		// https://react-bootstrap.github.io/components.html#tabs
    return (
    	<div>
				<Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
					<Row className="clearfix">
						<Col sm={12}>
							<Nav bsStyle="tabs">
								<NavItem eventKey="first">
									Prijatelji
								</NavItem>
								<NavItem eventKey="second">
									Restorani
								</NavItem>
								<NavItem eventKey="third">
									Moj profil
								</NavItem>
								<Nav pullRight>
									<NavItem eventKey={1} href="#">Log out</NavItem>
								</Nav>
							</Nav>
						</Col>
						<Col sm={12}>
							<Tab.Content animation>
								<Tab.Pane eventKey="first">
									Prijatelji komponenta
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									Restorani komponenta
								</Tab.Pane>
								<Tab.Pane eventKey="third">
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
																		: <tbody><tr><th>All visited restaurants</th></tr></tbody>
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
																				: <tbody>
																			<tr>
																				<th>All visited restaurants</th>
																			</tr>
																			</tbody>
																		}
																	</table>
															}
														</div>
													</div>
												</div>
											</div>
										</div>
									</Col>
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

/*
 <div>
 <h1>Welcome to guest profile page</h1>

 <h3> You are logged in as: {`${user.email}`}</h3>

 <div>
 <h4>Name: {`${user.firstName} ${user.lastName}`}</h4>
 <h4>Email: {`${user.email}`}</h4>
 <img src="https://i.vimeocdn.com/portrait/58832_300x300" alt={`${user.firstName} ${user.lastName}`} />
 </div>

 {
 inProgress ?
 <Loading /> :
 <button onClick={login}> Log in </button>
 }

 <input type="text" onChange={this.changeName} />
 </div>
 
 <label htmlFor='userName'>Username</label>
 <Text onChange={this.getRestaurantsByName} field='restaurantName' placeholder='Restaurant name' className='form-control' />
 
 */