
// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col } from 'react-bootstrap';
import { buttonRowStyle, buttonStyle, emptyThStyle, tdStyle } from './css/css'
import './css/guest.css';

class Guest extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { key : 1 };
		
		this.getPotentialFriends = this.getPotentialFriends.bind(this);
		this.getCurrentFriends = this.getCurrentFriends.bind(this);
		this.addFriend = this.addFriend.bind(this);
		this.makePotentialFriendsTable = this.makePotentialFriendsTable.bind(this);
	}
	
	addFriend(newFriend) {
		// e.preventDefault();
		console.log("addFriend");
		console.log(newFriend);
		
		this.props.removePotentialFriend(newFriend);
		this.props.addFriend(newFriend, this.props.user.token);
	}
	
	getCurrentFriends(e) {
		e.preventDefault();
		console.log("getCurrentFriends");
		this.props.getCurrentFriends(this.props.user.token);
	}
	
	getPotentialFriends(e) {
		e.preventDefault();
		
		console.log("getPotentialFriends");
		console.log(this.props.user);
		
		this.props.getPotentialFriends(e.target.value, this.props.user.token);
	}
	
	makePotentialFriendsTable (potentialFriend, index ) {
		return <tr key={ index } id={ index } >
			<td>{potentialFriend.firstName}</td>
			<td>{potentialFriend.lastName}</td>
			<td id="td-button"><button onClick={() =>  this.addFriend(potentialFriend) }> Add friend </button></td>
		</tr>
	}
	
	
	render() {
		const { currentFriends, potentialFriends, gettingCurrentFriends, gettingPotentialFriends } = this.props.guest;
		return (
			<div>
				<Col xs={12} sm={12} md={6} lg={6}>
					<div className='panel panel-default'>
						<div className='panel-body'>
							<div className="row" style={buttonRowStyle}>
								<button className="btn btn-primary" type="button" onClick={this.getCurrentFriends}
												style={buttonStyle}> My friends </button>
							</div>
							{ gettingCurrentFriends ? <Loading /> :
							<table id="visited-restaurants-table">
								{
									currentFriends !== undefined && currentFriends.length > 0 ?
										<tbody><tr><th>Name</th><th>Last name</th><th>Visits</th></tr>
										{ currentFriends.map(function (currentFriend, index) {
											return <tr key={index}>
												<td style={tdStyle}>{currentFriend.firstName}</td>
												<td style={tdStyle}>{currentFriend.lastName}</td>
												<td style={tdStyle}>{`667`}</td>
											</tr>
										}) }
										</tbody>
										: <tbody><tr><th style={emptyThStyle}> Current friends </th></tr></tbody>
								}
							</table>
							}
							<br/>
							<div className="panel panel-info">
								<div style={{marginLeft: 10 + 'px'}}>
									<div className='form-group'>
										Search guests by name:
										<input id="input-potential-friends" type="text" onChange={this.getPotentialFriends}
												style={{marginTop: 5 + 'px', marginLeft: 5 + 'px'}}/>
									</div>
								</div>
								{
									gettingPotentialFriends ?
										<Loading/> :
										<table id="potential-friends-table">
											{
												potentialFriends !== undefined && potentialFriends.length > 0 ?
													<tbody><tr><th>Name</th><th>Last name</th><th>Add</th></tr>
													{ potentialFriends.map(this.makePotentialFriendsTable) }
													</tbody>
													: <tbody><tr><th style={emptyThStyle}> Potential friends </th></tr></tbody>
											}
										</table>
								}
							</div>
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default Guest;
