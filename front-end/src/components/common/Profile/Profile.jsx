import React , { Component } from 'react';

class Profile extends Component {

    render() {
      const { user } = this.props;
      return (
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">
							{ user.userName != null ? user.firstName + ' ' + user.lastName: 'No user is logged in' }
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