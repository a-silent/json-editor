import * as types from "../constants/actionTypes";
import axios from "axios";
import keyGenerator from "../utils/keyGenerator";
import { history } from "../history";

export const setValue = payload => ({
  type: types.SET_VALUE,
  payload
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const resetError = error => ({
  type: types.RESET_ERROR
});

export const resetState = () => ({
  type: types.RESET_STATE
});

const hashRequest = payload => ({
  type: types.HASH_REQUEST,
  payload
});

const hashRequestSucces = payload => ({
  type: types.HASH_REQUEST_SUCCES,
  payload
});

const hashRequestFail = error => ({
  type: types.HASH_REQUEST_FAIL,
  error
});

export const getValueByHash = payload => async dispatch => {
  dispatch(hashRequest());
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://immense-dusk-23974.herokuapp.com/json-server"
    });
    const dataByHash = data.filter(item => item.hash === payload);
    if (dataByHash.length === 0) throw new Error("no hash in database");
    localStorage.setItem("json", JSON.stringify(dataByHash[0].json, null, 4));
    dispatch(hashRequestSucces(dataByHash[0]));
  } catch (e) {
    dispatch(hashRequestFail(e));
  }
};

export const setValueByHash = payload => async dispatch => {
  dispatch(hashRequest());
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://immense-dusk-23974.herokuapp.com/json-server",
      data: {
        hash: keyGenerator(),
        json: payload
      }
    });
    const { hash, json } = data;
    history.push(`/${hash}`);
    dispatch(hashRequestSucces({ json, hash }));
  } catch (e) {
    dispatch(hashRequestFail(e));
  }
};
