import * as types from '../constants';

import { get } from '../utils/http';

export const corsStart = () => ({
    types: types.CORS_STARTED
});

export const corsSuccess = ({ myData }) => ({
    type: types.CORS_SUCCESS,
    payload: { myData }
});

export const corsError = ({ myData }) => ({
    type: types.CORS_ERROR,
    payload: { myData }
});

// akcija CORS
export const testCors = ({ myData }) => dispatch => {
    dispatch(corsStart());

    get('http://localhost:8080/greeting')
        .then((res) => {
        console.log(res);
        return dispatch(corsSuccess({
            myData: myData,
            res: res }
            ));
        })
        .catch((err) => {
            alert(err);
            return dispatch(corsError({
                er: 'errMajData'
            }));
    });
}