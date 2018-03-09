import { IAction } from '../actions';
import { ActionTypes } from '../actions/exchange';
import { IExchange } from '../model';
import { StateSliceCollection } from '../store';

const initialState: StateSliceCollection<IExchange> = {
  list: [],
  loading: false,
};

export function exchanges(state: StateSliceCollection<IExchange> = initialState, action: IAction):
  StateSliceCollection<IExchange> {

  switch (action.type) {
    case ActionTypes.LOAD_COL:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOAD_COL_SUCCESS:
      return {
        errorMsg: '',
        infoMsg: 'Load Success',
        list: [...action.payload],
        loading: false,
      };
    case ActionTypes.LOAD_COL_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
        infoMsg: '',
        loading: false,
      };
    default:
      return state;
  }
};
