import React from 'react'
import { Text } from 'react-form';

const PasswordChangeFields = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <div className='form-group'>
      <label htmlFor='userName'>Old Password</label>
      <Text
        field='oldPassword'
        placeholder='Old password'
        type='password'
        className='form-control'
      />
    </div>
    <div className='form-group'>
      <label htmlFor='password'>New Password</label>
      <Text
        field='password'
        placeholder='New Password'
        type='password'
        className='form-control'
      />
    </div>
    <div className='form-group'>
      <label htmlFor='password'>New Password Confirmation</label>
      <Text
        field='passwordConfirmation'
        placeholder='New Password Confirmation'
        type='password'
        className='form-control'
      />
    </div>
    <div className='form-group'>
      <button type='submit' className='btn btn-default'>Submit Form</button>
    </div>
  </form>
);

export default PasswordChangeFields;