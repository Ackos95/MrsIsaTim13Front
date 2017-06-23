import React from 'react';
import { Redirect } from 'react-router-dom';

import PasswordChange from './PasswordChangeContainer';


const PasswordChangeRequired = ({ user }) => {
  
  if (user.changedPassword)
    return <Redirect to="/" />;

  return (
    <div className="container">
      <h1> You have to change your password </h1>

      <PasswordChange />
    </div>
  );
}

export default PasswordChangeRequired;