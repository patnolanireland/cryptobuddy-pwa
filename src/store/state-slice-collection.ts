export interface StateSliceCollection<T> {
  errorMsg?: string;
  filter?: string;
  infoMsg?: string;
  list: T[];
  loading: boolean;
  selected?: T;
}
