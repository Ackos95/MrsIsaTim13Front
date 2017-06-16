import React , { Component } from 'react';

// import { SERVER_URL } from '../../../config';
import { Link } from 'react-router-dom';

class Profile extends Component {

    render() {
      const { user } = this.props;
      return (
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
							{
							  user.userName !== null ? user.firstName + ' ' + user.lastName
                :
                <div>
                  <h3>
                    No user is logged in
                    <hr/>
                    {/*<a href={`${REACT_NESERVER_URL}/login`}>Login</a>*/}
                    <Link to="/login">Log in</Link>
                  </h3>
                </div>
							}
            </h3>
          </div>
    			<div className="panel-body">
            <div className="row">
              <div className=" col-md-9 col-lg-9 ">
                <table className="table table-user-information">
                  <tbody>
                  <tr>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{ user.userName != null ? user.firstName : 'Some username' }</td>
                  </tr>
                  <tr>
                    <td>First name</td>
                    <td> { user.firstName != null ? user.firstName : 'Planet Earth, Solar system #3' }</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td><a href={`${user.email}`}>{ user.email != null ? user.email : 'user@example.com' }</a></td>
	                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        );

    };
}

/*
 console.log('\nuser is Profile komponente:'));
 console.log(`${user}`);
 console.log(user.firstName);
 console.log(`${user.lastName}`);
 */

export default Profile;