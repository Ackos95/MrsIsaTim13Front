import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './App/App';
import Logout from './Logout/LogoutContainer';
import PasswordChange from './common/Profile/PasswordChange/PasswordChangeRequiredContainer';
import Login from './Login/LoginContainer';
import Registration from './Registration/RegistrationContainer';
import LunchInvitation from './Guest/LunchInvitationContainer';
import RegistrationConfirmation from './Registration/RegistrationConfirmationContainer';
import Guest from './Guest/Guest';
import Manager from './Manager/Manager'; // tabovi za menadzera
import BarmanProfile from './Employees/Barman/BarmanProfileContainer';
import WaiterProfile from './Employees/Waiter/WaiterProfileContainer';
import CookProfile from './Employees/Cook/CookProfileContainer';
import Supplier from './Supplier/SupplierContainer'
import SystemManager from './SystemManager/SystemManagerContainer';


const NotFound = () => (
  <div>
    Page you are looking for doesn't exist, go to 
    <Link to="/">Root path</Link>
  </div>
);


const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/guest" component={Guest} />
        <Route path="/manager" component={Manager} />
        <Route path="/supplier" component={Supplier} />
        <Route path="/system-manager" component={SystemManager} />
        <Route path="/barman" component={BarmanProfile} />
        <Route path="/waiter" component={WaiterProfile} />
        <Route path="/cook" component={CookProfile} />
        <Route path="/lunch-invitation/guest" component={LunchInvitation}/>
        <Route path="/registration/guest" component={RegistrationConfirmation}/>
        <Route path="/logout" component={Logout} />
        <Route path="/change-password" component={PasswordChange} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;