import React from 'react'
//noinspection JSUnresolvedVariable
import { Text } from 'react-form';

/**
 * Generički dio fomre za userName i password
 * @param submitForm akcija za submit
 * @param resetForm akcija za reset
 * @constructor ...
 */
const UsernameAndPassword = ({ submitForm, resetForm }) => (
  <form onSubmit={submitForm}>
    <div className='form-group'>
      <label htmlFor='userName'>Username</label>
      <Text
        field='userName'
        placeholder='Username'
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

export default UsernameAndPassword;