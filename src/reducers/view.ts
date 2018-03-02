import { IView } from '../model';
import { StateSlice } from '../store/state-slice';
import { IAction } from '../actions';
import { ActionTypes } from '../actions/view';

const initialState: StateSlice<IView> = {
  entity: null,
  loading: false,
};

export function activeView(state: StateSlice<IView> = initialState, action: IAction): StateSlice<IView> {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.ACTIVATE:
      return {
        ...state,
        entity: payload,
      };
    default:
      return state;
  }
};
