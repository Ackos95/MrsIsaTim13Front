// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Row, Col, Panel } from 'react-bootstrap'


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
      <div className="">
        <div className="panel panel-info">
          <Profile/>
          <div className="panel-footer">
            <div className="row">
							{
								inProgress ?
                  <Loading /> :
                  <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle2">
                    Dodavanje zaposlenog </button>
							}
              <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle3">
                Dodavanje dobavljača </button>
              <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle1">
                Potražnja </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Guest;

/*
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
 */