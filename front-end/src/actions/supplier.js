import * as types from '../constants';

import { SERVER_URL } from '../config';

import { $post, addAuthHeader } from '../utils/http';

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


export const addOffer = (offer, token) => dispatch => {
  dispatch(addOfferStart());

  console.log('forRequest, price: ' + offer.forRequest
    + ', ' + offer.price + ', token, pa {offer}: ' + token);
  console.log(offer);

  $post(`${SERVER_URL}/supplies/offers`, offer, addAuthHeader(token))
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