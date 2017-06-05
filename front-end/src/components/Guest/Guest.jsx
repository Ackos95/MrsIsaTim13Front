// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col } from 'react-bootstrap';
import { buttonRowStyle, buttonStyle} from './css/css'
import './css/guest.css';

class Guest extends Component {

  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
		this.getVisitedRestaurants = this.getVisitedRestaurants.bind(this);
	}

  changeName(e) {
    e.preventDefault();

    this.props.changeName(e.target.value);
  }
  
	getVisitedRestaurants(e) {
  	e.preventDefault();
  	console.log(this.props.user);
		console.log(this.props.user.token);
  	this.props.getVisitedRestaurants(this.props.user.token);
  	
		
  	console.log("restoraani");
  	
  	console.log(this.props.guest.restaurants);
	}

  render() {
    const { restaurants , gettingRestaurants } = this.props.guest;
    var visitedRestaurants = restaurants.map(function(restaurant, index){
			return <tr key={ index }>
				<td>{`${restaurants[index].name}`}</td>
				<td>{`${restaurants[index].city}`}</td>
				<td>{`667`}</td>
			</tr>
		});
    return (
      <Col xs={12} sm={12} md={6} lg={6}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className="panel panel-info">
              <Profile/>
              <div className="panel-footer">
                <div className="row">
									<div className="row" style={buttonRowStyle}>
										{
											gettingRestaurants ?
												<Loading /> :
												<button className="btn btn-primary" type="button" onClick={this.getVisitedRestaurants}
																style={buttonStyle}>
													Visited restaurants</button>
										}
									</div>
									<table id="visited-restaurants-table">
										{
											restaurants[0] != undefined ?
												<tbody><tr><th>Name</th><th>City</th><th>Distance</th></tr>
													{ visitedRestaurants }
												</tbody>
												: <tbody><tr><th>All visited restaurants</th></tr></tbody>
										}
									</table>
									<br/>
									<form id="restaurant-name-filter">
										Filter by name:
										<input type="text" id="focusOutInput" />
										<input type="submit" value="Pretraga" />
									</form>
									<table id="restaurants-table">
									</table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
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
 */