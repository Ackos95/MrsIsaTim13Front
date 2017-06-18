import { Record } from 'immutable';

import * as types from '../constants';

import { colors } from '../config';

const Restaurant = new Record({
  tables: [], // postojeći stolovi
  selectedTable: -1, // ID u bazi ili index u listi od kliknutog stola
  colorIndex: 0, // indeks boje stola
  chairCount: 5, // broj stolica za novi sto
  inProgress: false // get/update u toku
});

const initialState = new Restaurant();

const restaurantReducer = ( state = initialState, action ) => {
  switch (action.type) {

    case types.GET_TABLES_STARTED:
      return state.set('inProgress', true);

    case types.GET_TABLES_SUCCESS:
      return state
        .set('tables', action.payload.tables)
        .set('inProgress', false);

    case types.GET_TABLES_ERROR:
      return state.set('inProgress', false);

    case types.ADD_TABLE:
    {
      const newTable = action.payload.newTable;
      newTable['color'] = colors[state.colorIndex];
      newTable['chairCount'] = state.chairCount;
      console.log('Restaurant reducer ADD_TABLE>>>newTable');
      console.log(newTable);
      return state
        .set('tables', [...state.tables, action.payload.newTable]);
    }

    case types.DELETE_TABLE:
      return state
        // filter daje sve stolove kojima id NIJE tableId
        .set('tables', state.tables.filter(t => t.id !== action.payload.tableId));

    case types.UPDATE_ONE_TABLE:
    {
      // coppy array - ES6 style
      const newTables = [...state.tables];
      const index = state.tables.findIndex(t => t.id === action.payload.id);
      console.log('STO:' + index + ' payload.id: ' + action.payload.id + '\nUVIJEK isto!');
      newTables[index].x = action.payload.x;
      newTables[index].y = action.payload.y;
      return state
        .set('tables', newTables);
    }

    case types.UPDATE_COLOR_INDEX:
      console.log('action.payload.colorIndex: ' + action.payload.colorIndex);
      return state.set({'colorIndex': action.payload.colorIndex});

    case types.UPDATE_CHAIR_COUNT:
      console.log('action.payload.chairCount ' + action.payload.chairCount);
      return state.set({'chairCount': action.payload.chairCount});

    default:
      return state;
  }
};

export default restaurantReducer;