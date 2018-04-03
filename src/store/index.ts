import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../reducers/index';
import { IStoreState } from '../model/store';
import rootSaga from '../sagas/index';

const initialState: IStoreState = {
  activeView: {
    title: '',
  },
  exchanges: {
    list: [],
    loading: false,
  },
};

const sagaMiddleware = createSagaMiddleware();

export { StateSlice } from './state-slice';
export { StateSliceCollection } from './state-slice-collection';

export const configureStore = (state: IStoreState = initialState) => {
  const store = createStore(rootReducer, state, applyMiddleware(sagaMiddleware, logger));
  sagaMiddleware.run(rootSaga);
  return store;
};
