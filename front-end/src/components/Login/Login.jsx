import React from 'react';
import { Form } from 'react-form';
import { PropTypes } from 'prop-types';
import LoginFields from './LoginFields';


// This should be imported from utils
const validateLoginForm = (values) => {
  const { email, password } = values;

  return {
    email: !email ? 'Email is required' : undefined,
    password: !password ? 'Password is required' : undefined
  }
}

const Login = ({ login }) => (
  <div className='container'>
    <div className='panel panel-default'>
      <div className='panel-body'>
        <Form
          onSubmit={login}
          validate={validateLoginForm}
        >
          {LoginFields}
        </Form>
      </div>
    </div>
  </div>
);

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

export default Login;