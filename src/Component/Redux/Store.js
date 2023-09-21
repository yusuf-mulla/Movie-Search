import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./Reducers/ProductReducer";

export const configStore = () => {
  const extenstion =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const myStore = createStore(combineReducers({ ProductReducer }), extenstion);

  return myStore;
};
