import React from 'react';

const Profile = ({ user }) => {
  console.log('\nuser is Profile komponente:');
  console.log(user);

  return (
    <div className="">
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">
            {`${user.firstName} ${user.lastName}`}
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
                  <td>{`${user.userName}`}</td>
                </tr>
                <tr>
                  <td>First name</td>
                  <td>{`${user.firstName}`} ?? asdfPlanet Earth, Solar system #3</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><a href={`${user.email}`}>{`${user.email}`}</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle2">
              Dodavanje zaposlenog </button>

            <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle3">
              Dodavanje dobavljača </button>

            <button className="btn btn-primary" type="button" style={{margin: '0 0 20px 20px'}} data-toggle="collapse" href="#toggle1">
              Potražnja </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Profile;