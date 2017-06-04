// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';

class Guest extends Component {

  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
  }

  changeName(e) {
    e.preventDefault();

    this.props.changeName(e.target.value);
  }

  render() {
    const { user, inProgress, login } = this.props;
    return (
      <div>
        <h1>Welcome to guest profile page</h1>

        <h3> You are logged in as: {`${user.email}`}</h3>

        <div>
          <h4>Name: {`${user.firstName} ${user.lastName}`}</h4>
          <h4>Email: {`${user.email}`}</h4>
          <img src="https://i.vimeocdn.com/portrait/58832_300x300" alt={`${user.firstName} ${user.lastName}`} />
        </div>

        {
          inProgress ?
          <Loading /> :
          <button onClick={login}> Log in </button>
        }

        <input type="text" onChange={this.changeName} />
      </div>
    );
  }
}

export default Guest;