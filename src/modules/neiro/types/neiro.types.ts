export enum CompanyNamesEnum {
  gasprom = 'gasprom',
  yandex = 'yandex',
  vk = 'vk',
}

export interface IPredictedValues {
  open: number,
  close: number,
  high: number,
  low: number,
  value: number,
}

export interface ISavedValues {
  open: number[],
  close: number[],
  high: number[],
  low: number[],
  value: number[],
}

export enum LoadingStatusCodesEnum {
  notLoaded = 'not_loaded',
  loaded = 'loaded',
  error = 'error',
}

export enum LoadingStatusActionsEnum {
  noAction = 'no',
  loading = 'loading',
  saving = 'saving',
  deleting = 'deleting',
}

export type NLoadingStatus = {
  code: LoadingStatusCodesEnum;
  action: LoadingStatusActionsEnum;
  errorCode?: string;
  msg?: string;
};

export interface IPredictionResponse {
  failure: boolean;
  errorCode: string;
  errorMessage: string;
  payload: IPredictedValues;
}
