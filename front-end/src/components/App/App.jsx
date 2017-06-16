import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './css/App.css';

const App = ({ user }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/components/App/App.js</code> : and save to reload.
    </p>
    {
      user.token
      ? (<p>You are logged in as: `{user.firstName} {user.lastName} ({user.userName})`</p>)
      : ''
    }
    <Link to="/login">Log in</Link>
    <br/>
		<Link to="/register">Sign up</Link>
		<br/>
    <Link to="/guest">Guest</Link>
    <br/>
    <Link to="/manager">Manager</Link>
    <br/>
    <Link to="/supplier">Supplier</Link>
  </div>
);

App.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);