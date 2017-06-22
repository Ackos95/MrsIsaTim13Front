import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';


class Order extends Component {

  static propTypes = {
    order: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderDrinks = this.renderDrinks.bind(this);
    this.renderMeals = this.renderMeals.bind(this);
  }

  renderDrinks(order) {
    const { options: { showDrinks } } = this.props;

    if (!showDrinks) 
      return null;

    return map(order.drinks, (drink) => (
      <li key={`DRINK_ID_${drink.id}`}>
        {drink.name}
      </li>
    ));
  }

  renderMeals(order) {
    const { options: { showMeals } } = this.props;

    if (!showMeals)
      return null;

    return map(order.meals, (meal) => (
      <li key={`MEAL_ID_${meal.id}`}>
        {meal.name}
      </li>
    ));
  }

  render () {
    const { order } = this.props;

    return (
      <li key={`ORDER_ID_${order.id}`}>
        <div> ORDER ID: {order.id} </div>

        <ul>
          {this.renderDrinks(order)}
        </ul>

        <ul>
          {this.renderMeals(order)}
        </ul>
      </li>
    );
  }
}

export default Order;