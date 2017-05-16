import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Login.css';

class Login extends Component {
    render() {
        if (this.props.user)
        return (
        <div id="center-div">
          <form action="/login" method="post">
            <div id="imgcontainer">
              <img src="restaurant.png" alt="Restaurant" title="Restaurant" id="avatar" />
            </div>
            <div id="container">
              <label>Username</label>
              <input type="text" id="username" placeholder="Enter Username" name="userName" required="true" />

              <label>Password</label>
              <input type="password" placeholder="Enter Password" name="password" required="true" />
              <button type="submit">Login - ulogovani ste..</button>
              <label>Don't have an account? <a href="/registration/guest">Sign Up</a></label>
            </div>
          </form>
        </div>
        );

        return (
            <div>
                You're logged in!
                <a href="/">Root path</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);