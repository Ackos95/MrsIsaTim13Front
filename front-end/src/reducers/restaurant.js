import { Record } from 'immutable';

import * as types from '../constants';

const Restaurant = new Record({
  tables: [], // postojeći stolovi
  selectedTableId: -1, // ID u bazi od kliknutog stola
	selectedTablesId: [], // lista ID-jeva svih selektovanih stolova
  colorIndex: 0, // indeks boje stola
  chairCount: 5, // broj stolica za novi sto
  inProgress: false, // get/update u toku
  confirmationInProgress: false // da li je update zavrsen
});

const initialState = new Restaurant();

const restaurantReducer = ( state = initialState, action ) => {
  switch (action.type) {

		/** TABLE CONFIG SUCCESS */
		case types.TABLE_CONFIGURATION_SUCCESS:
		{
			console.log("\n reducers restaurant.js  > TABLE_CONFIGURATION_SUCCESS ");
			console.log("action payload.configuration");
			console.log(action.payload.configuration);
			console.log(action.payload.configuration.tables);
			return state.set("tables", action.payload.configuration.tables);
		}
			
  	
    case types.GET_TABLES_STARTED:
    case types.DELETE_TABLE_STARTED:
      return state.set('inProgress', true);

    case types.CONFIRMATION_IN_PROGRESS: // updateDone ga poziva, pa treba da zavrsi prikaz poruke
      return state.set('confirmationInProgress', false);

    case types.GET_TABLES_SUCCESS:
      return state
        .set('tables', action.payload.tables)
        .set('inProgress', false);

    case types.ADD_TABLE_SUCCESS:
    {
      console.log('Restaurant reducer ADD_TABLE >>> newTable');
      console.log(action.payload.newTable);
      return state
        .set('tables', [...state.tables, action.payload.newTable])
        .set('inProgress', false)
        .set('confirmationInProgress', true); // da li traje prikaz poruke klijentu? DA!
    }

    case types.DELETE_TABLE_SUCCESS:
      return state
        .set('selectedTableId', -1) // reset odabranog stola
        .set('tables', state.tables.filter(t => t.id !== action.payload.deletedId))
        .set('inProgress', false)
        .set('confirmationInProgress', true);

    case types.SELECT_TABLE:
    {
    	let newSelectedTablesId;
    	if (state.selectedTablesId.includes(action.payload.id))
				newSelectedTablesId = state.selectedTablesId.filter(id => id !== action.payload.id);
    	else
				newSelectedTablesId = [...state.selectedTablesId, action.payload.id];
      return state
        .set('selectedTableId', action.payload.id)
        .set('chairCount', action.payload.chairCount)
				.set('selectedTablesId', newSelectedTablesId);
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

          console.log('OVO SE NE SNIMA U BAZU!!!');
          alert('ovo nije u bazi');
        }
        return state.set('chairCount', action.payload.chairCount);
      }

    case types.GET_TABLES_ERROR:
    case types.DELETE_TABLE_ERROR:
      return state.set('inProgress', false);

    default:
      return state;
  }
};

export default restaurantReducer;