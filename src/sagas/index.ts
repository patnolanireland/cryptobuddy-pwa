import { all } from 'redux-saga/effects';

import { watchForLoadExchangesAsync } from './exchange';

export default function* rootSaga() {
  yield all([
    watchForLoadExchangesAsync(),
  ]);
}
