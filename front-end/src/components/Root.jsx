import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './App/App';
import Login from './Login/LoginContainer';
import Registration from './Registration/RegistrationContainer';
import RegistrationConfirmation from './Registration/RegistrationConfirmationContainer';
import Guest from './Guest/Guest';
import Manager from './Manager/Manager'; // tabovi za menadzera
import Supplier from './Supplier/SupplierContainer';

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
				<Route path="/registration/guest" component={RegistrationConfirmation}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;