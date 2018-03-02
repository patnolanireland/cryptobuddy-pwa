import { type } from '../types';
import { IView } from '../model';

export const ActionTypes = {
  ACTIVATE: type('[View] Activate'),
};

/* Action Creators */

export const activateView = (view: IView) => (dispatch, _getState) => {
  return dispatch({ type: ActionTypes.ACTIVATE, payload: view });
};
