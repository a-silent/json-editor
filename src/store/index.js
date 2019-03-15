import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "../reducers";
import initialState from "./initialState";


const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

export default createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares)
)