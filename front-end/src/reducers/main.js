import { Record } from 'immutable';

const Main = new Record({
  mainId: 'test'
});

const initialState = new Main();

const mainReducer = (state = initialState, action) => {
  return state;  
}

export default mainReducer;