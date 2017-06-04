import React from 'react';
import { Form } from 'react-form';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginFields from './LoginFields';


// This should be imported from utils
const validateLoginForm = (values) => {
  const { email, password } = values;

  return {
    email: !email ? 'Email is required' : undefined,
    password: !password ? 'Password is required' : undefined
  }
}

const Login = ({ user, login, testCors }) => {
  console.log(user);
  if (user)
    return <Redirect to="/" />

  return (
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
        <button onClick={testCors}>CORS</button>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  testCors: PropTypes.func.isRequired,
}

export default Login;