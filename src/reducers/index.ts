import { combineReducers } from 'redux';

import { activeView } from './view';

export const rootReducer = (combineReducers as any)({
  activeView,
});
