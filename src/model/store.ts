import { IView } from './view';
import { IExchange } from './api/exchange';
import { StateSliceCollection } from '../store';

export interface IStoreState {
  activeView: IView;
  exchanges: StateSliceCollection<IExchange>;
  error?: string;
}
