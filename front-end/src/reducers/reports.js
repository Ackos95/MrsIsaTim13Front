import { Record } from 'immutable';

import * as types from '../constants';

const Reports = new Record({
  grade: null, // ocjena restorana
  inProgress: false,
  // reportText: '', // naslov izvjestaja - postavlja se u akcijama // prebaceno U STATE
});

const initialState = new Reports();

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.EDIT_INFO:
      return state;

    default:
      return state;
  }
};

export default reportsReducer;