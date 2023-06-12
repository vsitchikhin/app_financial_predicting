import {Ref} from "vue";

export enum CompanyNamesEnum {
  gasprom = 'Газпром',
  yandex = 'Yandex',
  vk = 'VK',
}

export interface IPredictedValues {
  open: number,
  close: number,
  high: number,
  low: number,
  value: bigint,
}

export interface ISavedValues {
  open: number[],
  close: number[],
  high: number[],
  low: number[],
  value: bigint[],
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

export interface ICompaniesResponse {
  payload: CompanyNamesEnum[],
  failure: false,
  errorMessage: '',
  errorCode: '',
}

export enum GraphicTypeEnum {
  multy = 'multy',
  single = 'single',
}

export interface ISeries {
  name: string,
  data: number[] | bigint[],
}

export interface IGraphicData {
  series: Ref<ISeries[]>,
  categories: Ref<number[]>,
}
