import React from 'react'
import { Text } from 'react-form';

const LoginFields = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <div className='form-group'>
      <label htmlFor='email'>Email</label>
      <Text
        field='email'
        placeholder='Email'
        className='form-control'
      />
    </div>
    <div className='form-group'>
      <label htmlFor='password'>Password</label>
      <Text
        field='password'
        placeholder='Password'
        type='password'
        className='form-control'
      />
    </div>
    <div className='form-group'>
      <button type='submit' className='btn btn-default'>Submit Form</button>
    </div>
  </form>
);

export default LoginFields;