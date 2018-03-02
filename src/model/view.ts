import { MatchResults } from '@stencil/router';

export interface IView {
  title: string;
  match?: MatchResults;
}
