// Guest profile page

import React, { Component } from 'react';

import Loading from '../common/Loading/Loading';
import Profile from '../common/Profile/ProfileContainer';

// BS reference: https://react-bootstrap.github.io/components.html
import { Row, Col, Panel } from 'react-bootstrap'

/* styles
 https://facebook.github.io/react/docs/dom-elements.html
 */
const buttonStyle = {
	marginBottom: 20 + 'px', marginLeft: 20 + 'px'
}

const tableStyle = {
	visibility: 'hidden', border: '1em solid black', padding: 2, width: '100%'
}

class Guest extends Component {

  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
		this.getVisitedRestaurants = this.getVisitedRestaurants.bind(this);
	}

  changeName(e) {
    e.preventDefault();

    this.props.changeName(e.target.value);
  }
	
	getVisitedRestaurants(e) {
  	e.preventDefault();
  	
  	this.props.getVisitedRestaurants(e.target.value);
	}

  render() {
    const { user, inProgress, login, getVisitedRestaurants } = this.props;
    return (
      <Col xs={12} sm={12} md={6} lg={6}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className="panel panel-info">
              <Profile/>
              <div className="panel-footer">
                <div className="row">
									<div className="row">
										<button className="btn btn-primary" type="button" onClick={getVisitedRestaurants} style={buttonStyle}>
											Svi posjećeni restorani</button>
									</div>
									<table id="visited-restaurants-table" style={tableStyle}>
									</table>
									<br/>
									<form id="restaurant-name-filter">
										Filtriranje po imenu(focusOut):
										<input type="text" id="focusOutInput" />
										<input type="submit" value="Pretraga" />
									</form>
									<table id="restaurants-table" style={tableStyle}>
									</table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
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