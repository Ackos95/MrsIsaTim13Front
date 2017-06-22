import React, { Component } from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';


class Order extends Component {

  static propTypes = {
    userToken: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderDrinks = this.renderDrinks.bind(this);
    this.renderMeals = this.renderMeals.bind(this);
  }

  renderDrinks(order) {
    const { options: { showDrinks, setDrinkDone }, userToken } = this.props;

    if (!showDrinks) 
      return null;

    return map(order.drinks, (drinkInfo) => (
      <li key={`DRINK_ID_${drinkInfo.id}`}>
        {drinkInfo.drink.name}

        <p className="status">{drinkInfo.done ? "Done" : "Pending"}</p>
        {!drinkInfo.done && setDrinkDone ? <button onClick={() => setDrinkDone(drinkInfo.id, userToken)}>Finish</button> : null}
      </li>
    ));
  }

  renderMeals(order) {
    const { options: { showMeals, setMealDone, setMealAccepted }, userToken } = this.props;

    if (!showMeals)
      return null;

    return map(order.meals, (mealInfo) => (
      <li key={`MEAL_ID_${mealInfo.id}`}>
        {mealInfo.meal.name}
        <p className="status">{mealInfo.done ? "Done" : (mealInfo.accepted ? "Accepted" : "Pending")}</p>
        {!mealInfo.accepted && !mealInfo.done && setMealAccepted ? <button onClick={() => setMealAccepted(mealInfo.id, userToken)}>Accept</button> : null}
        {mealInfo.accepted && !mealInfo.done && setMealDone ? <button onClick={() => setMealDone(mealInfo.id, userToken)}>Finish</button> : null}
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