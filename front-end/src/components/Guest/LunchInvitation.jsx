import React, { Component } from 'react';

import DrinkAndMealChooser from './../common/Checkbox/DrinkAndMealChooser'
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
		
		this.printState = this.printState.bind(this);
	}
	
	printState() {
		console.log("console.log(this.props.guest.lunchInvitation);");
		console.log(this.props.guest.lunchInvitation);
		console.log("console.log(this.state);");
		console.log(this.state);
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
	
	/** Meals checkbox - tables - END */
	
	
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
							{ this.state.invitationStep === 2 ?
								<DrinkAndMealChooser lunchGuest={this.props.guest.lunchInvitation.lunchGuest}
																		 timeStamp={this.props.guest.lunchInvitation.realDate}
																		 restaurant={this.props.guest.lunchInvitation.restaurant}
																		 sendMealOrder={this.props.sendMealOrder} />
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
