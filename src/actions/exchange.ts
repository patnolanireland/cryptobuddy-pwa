import { type } from '../types';

export const ActionTypes = {
  LOAD_COL: type('[Exchange] Load Collection'),
  LOAD_COL_SUCCESS: type('[Exchange] Load Collection Success'),
  LOAD_COL_FAIL: type('[Exchange] Load Collection Fail')
};

/* Action Creators */

export const loadExchanges = () => (dispatch, _getState) => {
  return dispatch({ type: ActionTypes.LOAD_COL });
};
