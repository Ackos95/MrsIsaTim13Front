import * as types from '../constants';

import { SERVER_URL } from '../config';

import { $get, $post, addAuthHeader } from '../utils/http';


/** ** ** ** ** **
 *  GET REQUESTS
 ** ** ** ** ** **/

export const getRequestsStart = () => ({
  type: types.GET_REQUESTS_STARTED
});

export const getRequestsError = () => ({
  type: types.GET_REQUESTS_ERROR
});

export const getRequestsSuccess = ( requests ) => ({
  type: types.GET_REQUESTS_SUCCESS,
  payload: requests
});


export const getRequests = ( token ) => dispatch => {
  dispatch(getRequestsStart());

  console.log('id ~ token~');
  console.log(token); // tu je i token
  console.log(token.token); // tu je i token

  $get(`${SERVER_URL}/supplies/restaurantRequests`,
    null, addAuthHeader(token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());
      console.log('res');
      console.log(res);

      const { data } = res;
      return dispatch(getRequestsSuccess({requests: data}))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(getRequestsError());
    });
};


/** ** ** ** ** ** ** ** ** ** ** ** ** **
 *   GET 1 REQUEST / ALL IT'S OFFERS
 * NE treba zbog REQUESTS promjenljive?
 ** ** ** ** ** ** ** ** ** ** ** ** ** **/


/** ** ** ** ** **
 **  ADD OFFER  **
 ** ** ** ** ** **/

export const addOfferStart = () => ({
  type: types.ADD_OFFER_STARTED
});

export const addOfferError = () => ({
  type: types.ADD_OFFER_ERROR
});

export const addOfferSuccess = ( createdOffer ) => ({
  type: types.ADD_OFFER_SUCCESS,
  payload: { createdOffer }
});


export const addOffer = ({ offer }) => dispatch => {
  dispatch(addOfferStart());

  console.log('forRequest, price: ' + offer.forRequest
    + ', ' + offer.price + ', token, pa {offer}: ' + offer. token);
  console.log(offer);

  $post(`${SERVER_URL}/supplies/offers`,
    {
      token: offer.token,
      supplyOffer: offer
    }, addAuthHeader(offer.token))
    .then((res) => {
      // here will go if (res.status > 400) dispatch(__Error());

      const { data } = res;
      return dispatch(addOfferSuccess({
        id: data.id,
        guarantee: data.guarantee,
        price: data.price,
        deliveredUntil: data.deliveredUntil
      }))
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
      return dispatch(addOfferError());
    });
};