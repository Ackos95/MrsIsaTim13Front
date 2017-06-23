import React from 'react';

import PasswordChange from './PasswordChangeContainer';


const PasswordChangeRequired = ({ user }) => {
  
  // if (user.complete)
  //   return <Redirect to="/" />;

  return (
    <div className="container">
      <h1> You have to change your password </h1>

      <PasswordChange />
    </div>
  );
}

export default PasswordChangeRequired;