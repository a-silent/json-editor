import * as types from "../constants/actionTypes";

import initialState from "../store/initialState";

export default (state = initialState.jsonValue, {type, payload, error}) => {
  
  switch (type) {
	
	case types.SET_VALUE: {
	  return { ...state, json: payload }
	}
	case types.RESET_STATE: {
	  return { ...initialState.jsonValue }
	}
	case types.SET_ERROR: {
	  return { ...initialState.jsonValue, error }
	}
	case types.RESET_ERROR: {
	  return { ...state, error: null }
	}
	case types.HASH_REQUEST: {
	  return {...state, isFetching: true, error: null, hash: null}
	}
	case types.HASH_REQUEST_SUCCES: {
	  let { json, hash } = payload;
	  json = JSON.stringify(json, null, 4)
	  return {...state, isFetching: false, json, error: null, hash}
	}
	case types.HASH_REQUEST_FAIL: {
	  return {...state, isFetching: false, error, json: "", hash: null}
	}
	default:
	  return state;
  }
}