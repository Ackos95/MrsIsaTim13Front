import React from 'react';
import { Form } from 'react-form';
import { PropTypes } from 'prop-types';

import PasswordChangeFields from './PasswordChangeFields';
// import Loading from '../common/Loading/Loading';


// This should be imported from utils
const validatePasswordForm = (values) => {
  const { password, passwordConfirmation, oldPassword } = values;

  return {
    password: !password ? 'Password is required' : undefined,
    passwordConfirmation: !passwordConfirmation ? 'Password confirmation is required!' : (password !== passwordConfirmation ? 'Password and confirmation must match' : undefined),
    oldPassword: !oldPassword ? 'Old password is required' : undefined, // here maybe include oldPassword check (token check)
  }
};

const PasswordChange = ({ user, passwordChanged, changePassword }) => (
  <div className='container'>
    <div className='panel panel-default'>
      <div className="panel-header">
        {passwordChanged ? 'Password updated' : ''}
      </div>
      <div className='panel-body'>
        <Form
          onSubmit={(args) => changePassword({ passwordInfo: args, userToken: user.token })}
          validate={validatePasswordForm}
        >
          {PasswordChangeFields}
        </Form>
      </div>
    </div>
  </div>
);

PasswordChange.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

export default PasswordChange;