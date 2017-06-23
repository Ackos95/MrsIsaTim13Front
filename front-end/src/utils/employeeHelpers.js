import moment from 'moment';
import filter from 'lodash/filter';
import find from 'lodash/find';
import map from 'lodash/map';

const BARMAN_ROLE = 'ROLE_EMPLOYEE_BARMAN';
const WAITER_ROLE = 'ROLE_EMPLOYEE_WAITER';
const COOK_ROLE = 'ROLE_EMPLOYEE_COOK';


export const getBarmanSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === BARMAN_ROLE));

export const getWaiterSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === WAITER_ROLE));

export const getCookSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === COOK_ROLE));

export const getActiveOrders = (orders) => filter(orders, (order) => moment(order.timeStamp).isAfter(moment().day(moment().day() - 1)) && !order.receipt);

export const updateDrinkOrders = (orders, newDrink) => map(orders, (order) => {
  order.drinks = map(order.drinks, (drink) => drink.id === newDrink.id ? newDrink : drink);
  return order;
});

export const updateMealOrders = (orders, newMeal) => map(orders, (order) => {
  order.meals = map(order.meals, (meal) => meal.id === newMeal.id ? newMeal : meal);
  return order;
});