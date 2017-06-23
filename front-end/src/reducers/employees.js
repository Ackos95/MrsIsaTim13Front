import { Record } from 'immutable';
import * as types from '../constants';

import {
  getBarmanSchedules,
  getWaiterSchedules,
  getCookSchedules,
  getActiveOrders,
  updateDrinkOrders,
  updateMealOrders,
} from '../utils/employeeHelpers';

const Employees = new Record({
  schedule: null,
  barmanSchedules: [],
  cookSchedules: [],
  waiterSchedules: [],
  orders: [],
  tableConfiguration: null,
  selectedTable: null,
});

const initialState = new Employees();

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SCHEDULE_SUCCESS:
      return state.set('schedule', action.payload)
              .set('barmanSchedules', getBarmanSchedules(action.payload.scheduleItems))
              .set('waiterSchedules', getWaiterSchedules(action.payload.scheduleItems))
              .set('cookSchedules', getCookSchedules(action.payload.scheduleItems));

    case types.LOAD_ORDERS_SUCCESS:
      return state.set('orders', getActiveOrders(action.payload));

    case types.SET_MEAL_ACCEPTED_SUCCESS:
    case types.SET_MEAL_DONE_SUCCESS:
      return state.set('orders', updateMealOrders(state.orders, action.payload));
    case types.SET_DRINK_DONE_SUCCESS:
      return state.set('orders', updateDrinkOrders(state.orders, action.payload));

    case types.LOAD_CONFIGURATION_SUCCESS:
      return state.set('tableConfiguration', action.payload);

    case types.SELECT_TABLE_EMPLOYEE:
      return state.set('selectedTable', action.payload);

    case types.SET_ORDER_DONE_SUCCESS:
      return state.set('orders',  getActiveOrders(state.orders.map((order) => {
        if (order.id === action.payload.mealOrderId)
          order.receipt = action.payload;

        return order;
      })));

    default:
      return state;
  }
}

export default employeesReducer;


// ngOnInit() {
//         //this.setReon();
//         console.log("aaaaaaaaaaaaaaaaaaaaa");
//         this.load();
//         this.registerChangeInRestaurantLocations();

//     }

//     load() {
//         this.restaurantLocationService.getMyLocation().subscribe((restaurantLocation) => {
//             this.restaurantLocation = restaurantLocation;
//             console.log("loc:", this.restaurantLocation);
//             this.restaurantLocationService.findReons(this.restaurantLocation.id).subscribe((reons) => {
//                 this.restaurantLocation.reons = reons;
//             });
//         });
//     }