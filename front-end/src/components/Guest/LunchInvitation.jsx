
// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';

// BS reference: https://react-bootstrap.github.io/components.html
import { Col , Button } from 'react-bootstrap';
import { buttonRowStyle, buttonStyle, emptyThStyle, tdStyle } from './css/css'
import './css/guest.css';

class LunchInvitation extends Component {
	
	constructor(props) {
		super(props);
		
		console.log("Props LunchInvitation komponente: ");
		console.log(props);
		
		// ?email=filipsavic1995@yahoo.com&token=[B@75e8a035
		let fullPath = props.location.search.split("&");
		let email = fullPath[0].slice(7);
		let token = fullPath[1].slice(6);
		let restaurantId = fullPath[2].slice(13);
		console.log(email);
		console.log(token);
		console.log(restaurantId);
		
		console.log("kraj konstruktora");
		
		this.state = {email: email, token: token, restaurantId: restaurantId, invitationStep : 1};
		
		this.removeFriend = this.removeFriend.bind(this);
		this.makePotentialFriendsTable = this.makePotentialFriendsTable.bind(this);
	}
	
	removeFriend(unwantedFriend) {
		console.log("removeFriend");
		console.log(unwantedFriend);
		
		this.props.removeFriend(unwantedFriend, this.props.user.token);
	}
	
	makePotentialFriendsTable (potentialFriend, index ) {
		return <tr key={ index } id={ index } >
			<td>{potentialFriend.firstName}</td>
			<td>{potentialFriend.lastName}</td>
			<td id="td-button"><Button bsStyle="success" style={{borderRadius: 0, width: 100 + '%'}} onClick={() =>  this.addFriend(potentialFriend) }> Add friend </Button></td>
		</tr>
	}
	
	
	render() {
		const {  } = this.props.guest;
		return (
			<div>
				<Col xs={12} sm={12} md={6} lg={6}>
					<div className='panel panel-default'>
						<div className='panel-body'>
							{/*<div className="row" style={buttonRowStyle}>*/}
								{/*<button className="btn btn-primary" type="button" onClick={this.getCurrentFriends}*/}
												{/*style={buttonStyle}> My friends </button>*/}
							{/*</div>*/}
							{/*{ gettingCurrentFriends ? <Loading /> :*/}
								{/*<table id="current-friends-table">*/}
									{/*{*/}
										{/*currentFriends !== undefined && currentFriends.length > 0 ?*/}
											{/*<tbody><tr><th>Name</th><th>Last name</th><th>Visits</th><th>Friend removal</th></tr>*/}
											{/*{ currentFriends.map(this.makeCurrentFriendsTable) }*/}
											{/*</tbody>*/}
											{/*: <tbody><tr><th style={emptyThStyle}> Current friends </th></tr></tbody>*/}
									{/*}*/}
								{/*</table>*/}
							{/*}*/}
							{/*<br/>*/}
							{/*<div className="panel panel-info">*/}
								{/*<div style={{marginLeft: 10 + 'px'}}>*/}
									{/*<div className='form-group'>*/}
										{/*Search guests by name:*/}
										{/*<input id="input-potential-friends" type="text" onChange={this.getPotentialFriends}*/}
													 {/*style={{marginTop: 5 + 'px', marginLeft: 5 + 'px'}}/>*/}
									{/*</div>*/}
								{/*</div>*/}
								{/*{*/}
									{/*gettingPotentialFriends ?*/}
										{/*<Loading/> :*/}
										{/*<table id="potential-friends-table">*/}
											{/*{*/}
												{/*potentialFriends !== undefined && potentialFriends.length > 0 ?*/}
													{/*<tbody><tr><th>Name</th><th>Last name</th><th>Add</th></tr>*/}
													{/*{ potentialFriends.map(this.makePotentialFriendsTable) }*/}
													{/*</tbody>*/}
													{/*: <tbody><tr><th style={emptyThStyle}> Potential friends </th></tr></tbody>*/}
											{/*}*/}
										{/*</table>*/}
								{/*}*/}
							{/*</div>*/}
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default LunchInvitation;
