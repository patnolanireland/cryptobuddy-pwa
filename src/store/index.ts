import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from '../reducers/index';
import { IStoreState } from '../model';

const initialState: IStoreState = {
  activeView: {
    title: '',
  }
};

export const configureStore = (state: IStoreState = initialState) => {
  const store = createStore(rootReducer, state, applyMiddleware(logger));
  return store;
};
