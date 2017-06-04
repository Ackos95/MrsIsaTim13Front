import * as types from '../constants';
import { Record } from 'immutable';

const Guest = new Record({
  dirty: false
});

const initialState = new Guest();

const guestReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.CHANGE_NAME:
      return state.set('dirty', true);

    default:
      return state;
  }
}