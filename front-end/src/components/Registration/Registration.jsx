import React from 'react';
import { Form } from 'react-form';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

import RegistrationFields from './RegistrationFields';
import Loading from '../common/Loading/Loading';

const validateRegistrationForm = (values) => {
	const { firstName, lastName, userName, email, password, passwordConfirmation } = values;
	
	let passwordErr = null;
	if (password!==passwordConfirmation) passwordErr = 'Passwords do not match';
	if (!passwordConfirmation) passwordErr = 'Password confirmation is required';
	
	return {
		firstName: !firstName ? 'First name is required' : undefined,
		lastName: !lastName ? 'Last name is required' : undefined,
		userName: !userName ? 'Username is required' : undefined,
		email: !email ? 'Email is required' : undefined,
		password: !password ? 'Password is required' : undefined,
		passwordConfirmation: passwordErr!==null ? passwordErr : undefined
	}
};

const Registration = ({ user, inProgress, errorMessage, register }) => {
	
	// if (user)
	// 	return <Redirect to="/" />
	
	return (
		<div className='container'>
			{ errorMessage === 'success' ?
				<div>
					<h2 style={{textAlign: 'center'}}>Elektronska pošta je poslata na vašu adresu.
						Molimo Vas da provjerite Vaše sanduče i potvrdite registraciju da biste se mogli ulogovati.</h2>
				</div>
				:
				<div className='panel panel-default'>
					<div className='panel-body'>
						<Form
							onSubmit={register}
							validate={validateRegistrationForm}
						>
							{RegistrationFields}
						</Form>
						{ errorMessage ? <div style={{textColor: 'red', fontSize: 20 + 'px'}}>{errorMessage}</div> : null}
						{ inProgress ? <Loading /> : null }
					</div>
				</div>
			}
		</div>
	);
};

Registration.propTypes = {
	register: PropTypes.func.isRequired,
};

export default Registration;