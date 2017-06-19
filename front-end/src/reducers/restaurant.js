import { Record } from 'immutable';

import * as types from '../constants';

import { reons, colors } from '../config';

const Restaurant = new Record({
  tables: [], // postojeći stolovi
  selectedTableId: -1, // ID u bazi od kliknutog stola
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
      newTable['reon'] = reons[state.colorIndex];
      // temp ID - nakon čuvanja u bazi postaće samo broj
      newTable['id'] = 'newTable' + state.tables.length;

      console.log('Restaurant reducer ADD_TABLE >>> newTable');
      console.log(newTable);

      return state
        .set('tables', [...state.tables, action.payload.newTable]);
    }

    case types.DELETE_TABLE:
      {
        // samo ako imamo odabrani sto
        if (state.selectedTableId === -1)
          return state;
        return state
          .set('selectedTableId', -1) // reset odabranog stola
          .set('tables', state.tables.filter(t => t.id !== state.selectedTableId));
          // Filter daje sve stolove kojima id NIJE tableId
          // Drugi nacin ---> ES6: https://stackoverflow.com/a/38699714/2101117
      }

    case types.SELECT_TABLE:
    {
      return state
        .set('selectedTableId', action.payload.id)
        .set('chairCount', action.payload.chairCount);
    }

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
      return state.set('colorIndex', action.payload.colorIndex);

    case types.UPDATE_CHAIR_COUNT:
      {
        if (state.selectedTableId !== -1) {
          const newTables = [...state.tables];
          let table = newTables[newTables.findIndex(t=> t.id === state.selectedTableId)];
          table.chairCount = action.payload.chairCount;
          state.set('tables', newTables);
        }
        return state.set('chairCount', action.payload.chairCount);
      }

    default:
      return state;
  }
};

export default restaurantReducer;