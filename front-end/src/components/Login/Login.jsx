import React from 'react';
import { Form } from 'react-form';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoginFields from './LoginFields';
import Loading from '../common/Loading/Loading';


// This should be imported from utils
const validateLoginForm = (values) => {
  const { userName, password } = values;

  return {
    userName: !userName ? 'Username is required' : undefined,
    password: !password ? 'Password is required' : undefined
  }
};

const Login = ({ state, user, inProgress, login }) => {
	console.log(state);
  console.log(user);
  if (user.token)
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
          { inProgress ? <Loading /> : null }
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;