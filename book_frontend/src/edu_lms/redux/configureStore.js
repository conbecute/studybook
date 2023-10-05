import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];
const enhancers = [applyMiddleware(...middleware)];
const store = createStore(rootReducer, composeEnhancers(...enhancers));
sagaMiddleware.run(sagas);

export const dispatch = store.dispatch;
export default store;
