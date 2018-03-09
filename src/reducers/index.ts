import { combineReducers } from 'redux';

import { activeView } from './view';
import { exchanges } from './exchange';

export const rootReducer = (combineReducers as any)({
  activeView,
  exchanges,
});
