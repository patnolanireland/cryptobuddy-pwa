import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from '../actions/exchange';
import config from '../config/active-config.json';

async function getExchanges(url) {
  try {
    const resp = await fetch(url);
    const exchanges = await resp.json();
    return exchanges;
  } catch (e) {
    throw e;
  }
}

function* loadExchangesAsync(): SagaIterator {
  try {
    const exchanges = yield call(getExchanges, `${config.ApiEndpoints.cryptobuddy}/exchanges`);
    yield put({ type: ActionTypes.LOAD_COL_SUCCESS, payload: exchanges });
  } catch (e) {
    const msg = e.message;
    yield put({ type: ActionTypes.LOAD_COL_FAIL, payload: msg });
  }
}

export function* watchForLoadExchangesAsync(): SagaIterator {
  yield takeLatest(ActionTypes.LOAD_COL, loadExchangesAsync);
}
