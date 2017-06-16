import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class RegistrationConfirmation extends Component {
	
	constructor(props) {
		super(props);
		console.log("Props regConf komponente: ");
		console.log(props);
		
		// ?email=filipsavic1995@yahoo.com&token=[B@75e8a035
		let fullPath = props.location.search.split("&");
		let email = fullPath[0].slice(7);
		let token = fullPath[1].slice(6);
		
		console.log(email);
		console.log(token);
		
		console.log("kraj konstruktora");
		
		this.state = {email: email, token: token};
		
		this.confirmRegistration = this.confirmRegistration.bind(this);
	}
	
	confirmRegistration() {
		this.props.registrationConfirmation({email: this.state.email, token: this.state.token});
	}
	
	render() {
		const confirmedRegistration = this.props.confirmedRegistration;
		const email = this.state.email;
		
		return (
			<div>
				
				<h3 style={{textAlign: 'center'}}>Dobrodošli na stranicu za potvrdu registracije!</h3>
				<h3 style={{textAlign: 'center'}}>Registrovali ste se sa adresom: {email}</h3>
				<h3 style={{textAlign: 'center'}}>Nakon što potvrdite registraciju, bićete usmjereni na
					stranicu na kojoj se možete ulogovati koristeći Vaše korisničko ime i šifru.</h3>
				
				<h2 style={{textAlign: 'center'}}>
					
					{ console.log("this.props.confirmedRegistration")}
					{ console.log(confirmedRegistration)}
					
					{ confirmedRegistration === false ?
						<Button bsStyle="primary" onClick={this.confirmRegistration}>Potvrdite registraciju</Button>
							: <Redirect to="/login"/>
					}
				</h2>
			
			</div>
		)
	}
}

export default RegistrationConfirmation;

/*
 <h2 style={{textAlign: 'center'}}>Regisracija je potvrđena. Kliknite
 <a href="/login"> ovdje </a> da se ulogujete.</h2>
 */