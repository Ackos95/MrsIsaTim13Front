import React , { Component } from 'react';
import { Button } from 'react-bootstrap';

// import { SERVER_URL } from '../../../config';
import { Link } from 'react-router-dom';

class Profile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {editingInfo: false};
		
		this.editInfo = this.editInfo.bind(this);
		this.cancelEditing = this.cancelEditing.bind(this);
		this.saveInfo = this.saveInfo.bind(this);
		
		this.changedInput = this.changedInput.bind(this);
	}
	
	changedInput(input) {
		console.log(input);
	}
	
	saveInfo() {
		let oldUser = this.props.user;
		// let newUserName = document.getElementById("newUserName");
		let newFirstName = document.getElementById("newFirstName");
		let newLastName = document.getElementById("newLastName");
		let newEmail = document.getElementById("newEmail");
		// let password = document.getElementById("new");
		let newUserInfo = {id: oldUser.id, userName: oldUser.userName, firstName: newFirstName.value,
										lastName: newLastName.value, email: newEmail.value};
		// preko mapDispatchToProps dobio
		this.props.editInfo(newUserInfo, oldUser.token, this.props.employeeFlag);
		
		this.setState({editingInfo : false});
	}
	
	cancelEditing() {
		this.setState({editingInfo : false});
	}
	
	editInfo() {
		this.setState({editingInfo : true});
	}

	render() {
		const { user } = this.props;
		return (
			<div className="panel panel-info">
				<div className="panel-heading">
					<h3 className="panel-title">
						{
							user.userName !== null ? user.firstName + ' ' + user.lastName
								:
								<div>
									<h3>
										No user is logged in
										<hr/>
										{/*<a href={`${REACT_NESERVER_URL}/login`}>Login</a>*/}
										<Link to="/login">Log in</Link>
									</h3>
								</div>
						}
					</h3>
				</div>
				<div className="panel-body">
					<div className="row">
						<div className=" col-md-9 col-lg-9 ">
							<table className="table table-user-information">
								{
									this.state.editingInfo ?
										<tbody>
											<tr><td>First name</td>
												<td> <input id="newFirstName" type="text" defaultValue={user.firstName} /> </td>
											</tr>
											<tr><td>Last name</td>
												<td> <input id="newLastName" type="text" defaultValue={user.lastName} /> </td>
											</tr>
											<tr><td>Email</td>
												<td> <input id="newEmail" type="text" defaultValue={user.email} /> </td>
											</tr>
											<tr><td colSpan={2} style={{textAlign: 'center'}}>
												<Button style={{marginRight: 5 + 'px'}} onClick={this.saveInfo} > Save information </Button>
												<Button style={{marginLeft: 5 + 'px'}} onClick={this.cancelEditing} > Cancel editing </Button></td>
											</tr>
										</tbody>
										:
										<tbody>
											<tr><td>Username</td>
												<td>{ user.userName != null ? user.userName : 'NO username' }</td>
											</tr>
											<tr><td>First name</td>
												<td> { user.firstName != null ? user.firstName : 'NO first name' }</td>
											</tr>
											<tr><td>Last name</td>
												<td> { user.lastName != null ? user.lastName : 'NO last name' }</td>
											</tr>
											<tr><td>Email</td>
												<td><a href={`${user.email}`}>{ user.email != null ? user.email : 'NOEMAIL@example.com' }</a></td>
											</tr>
											{this.props.isEditable ?
													<tr><td colSpan={2} style={{textAlign: 'center'}}>
															<Button onClick={this.editInfo} > Edit information </Button> </td>
													</tr>
											: null}
										</tbody>
								}
							</table>
						</div>
					</div>
				</div>
			</div>
			);
    };
}

/*
 console.log('\nuser is Profile komponente:'));
 console.log(`${user}`);
 console.log(user.firstName);
 console.log(`${user.lastName}`);
 */

export default Profile;