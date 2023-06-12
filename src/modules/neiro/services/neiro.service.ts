import {Service} from "src/modules/setvice";
import {neiroStore} from "src/modules/neiro/services/neiro.store";
import {
  CompanyNamesEnum, ICompaniesResponse,
  IPredictedValues,
  IPredictionResponse,
  ISavedValues,
  LoadingStatusActionsEnum,
  LoadingStatusCodesEnum,
  NLoadingStatus
} from "src/modules/neiro/types/neiro.types";


export class NeiroService extends Service {
  private store;

  public constructor() {
    super();
    this.store = neiroStore();
  }

  // ------------------------------------------------------------------
  // Геттеры
  public get predictions(): ISavedValues | null {
    return this.store.predictedValues
  }

  public get predictionLoadingStatus(): NLoadingStatus {
    return this.store.predictionLoadingStatus;
  }

  public get currentCompany(): CompanyNamesEnum | null {
    return this.store.currentCompany;
  }

  public get companiesList(): CompanyNamesEnum[] | null {
    return this.store.companies;
  }

  public get companiesLoadingStatus(): NLoadingStatus {
    return this.store.companiesLoadingStatus;
  }

  // ------------------------------------------------------------------
  // API запросы
  // todo: сделать асинхронным
  public getPrediction(values: IPredictedValues): IPredictedValues {
    this.store.SET_PREDICTION_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    // todo: API запрос за предсказанием
    const response = this.responseImitation(values);

    if (!response.failure) {
      this.store.ADD_PREDICTED_VALUES(response.payload);

      this.store.SET_PREDICTION_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return response.payload;
    } else {
      this.store.SET_PREDICTION_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: response.errorCode,
        msg: response.errorMessage,
      })
    }
  }

  public loadCompaniesList() {
    this.store.SET_COMPANIES_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    // todo: API запрос за компаниями
    const response: ICompaniesResponse = {
      payload: [
        CompanyNamesEnum.vk,
        CompanyNamesEnum.yandex,
        CompanyNamesEnum.gasprom,
      ],
      failure: false,
      errorMessage: '',
      errorCode: '',
    }

    if (!response.failure) {
      this.store.SET_COMPANIES_PAYLOAD(response.payload);

      this.store.SET_COMPANIES_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });
    } else {
      this.store.SET_COMPANIES_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: response.errorCode,
        msg: response.errorMessage,
      })
    }
  }

  // ------------------------------------------------------------------
  // Методы
  public setCompanyName(name: CompanyNamesEnum) {
    this.store.SET_CURRENT_COMPANY(name);
    this.store.CLEAR_PREDICTED_VALUES();
  }

  public resetPredictions() {
    this.store.CLEAR_PREDICTED_VALUES();
  }

  private responseImitation(values: IPredictedValues): IPredictionResponse {
    const newValues: IPredictedValues = {...values}

    for (let value: number | bigint in newValues) {
      const isPlus = Math.random() > 0.5;
      if (typeof newValues[value] !== 'bigint') {
        newValues[value] = isPlus ? newValues[value] + Math.random() * 0.5 : newValues[value] - Math.random() * 0.5;
      } else {
        newValues[value] = isPlus ? newValues[value] + BigInt(Math.floor(Math.random() * 100)) : newValues[value] - BigInt(Math.floor(Math.random() * 100));
      }
    }

    return {
      payload: newValues,
      failure: false,
      errorMessage: '',
      errorCode: '',
    }
  }
}