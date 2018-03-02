export interface StateSlice<T> {
  errorMsg?: string;
  infoMsg?: string;
  entity: T;
  loading: boolean;
}
