import { Record } from 'immutable';

import * as types from '../constants';

const Cors = new Record({
    myData: 'cors myData'
});

const initialState = new Cors();

const corsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.CORS_SUCCESS:{
            console.log('iz cors reducera SUCCESS');
            return state.set('myData', action.payload);
        }

        case types.CORS_ERROR:
        {
            console.log('iz cors reducera ERROR');
            return state.set('myData', action.payload);
        }

        default:
            return state;
    }
}

// export default corsReducer;