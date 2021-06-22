import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import {loadState, saveState} from "./modules/localStorage";
import {stateReducer} from "./reducers/reducers"
import initialTasks from "./lib/initialTasks";

const initialState = {
  tasks: initialTasks,
  currentSessionId: "default"
}

const persistedState = loadState() || initialState ;

export const store= createStore(stateReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  currentSessionId: store.getState().currentSessionId,
  });
});
