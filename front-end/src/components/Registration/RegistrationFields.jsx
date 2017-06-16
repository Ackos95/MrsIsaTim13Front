import React from 'react'
import { Text } from 'react-form';

const RegistrationFields = ({ submitForm, resetForm }) => (
	<form onSubmit={submitForm}>
		<div className='form-group'>
			<label htmlFor='firstName'>First name</label>
			<Text
				field='firstName'
				placeholder='First name'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<label htmlFor='lastName'>Last name</label>
			<Text
				field='lastName'
				placeholder='Last name'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<label htmlFor='userName'>Username</label>
			<Text
				field='userName'
				placeholder='Username'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<label htmlFor='email'>E-mail</label>
			<Text
				field='email'
				placeholder='E-mail'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<label htmlFor='password'>Password</label>
			<Text
				field='password'
				placeholder='Password'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<label htmlFor='passwordConfirmation'>Password confirmation</label>
			<Text
				field='passwordConfirmation'
				placeholder='Password confirmation'
				className='form-control'
			/>
		</div>
		<div className='form-group'>
			<button type='submit' className='btn btn-default'>Register</button>
		</div>
	</form>
);

export default RegistrationFields;