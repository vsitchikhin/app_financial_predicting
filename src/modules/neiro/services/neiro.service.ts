import {Service} from "src/modules/setvice";
import {neiroStore} from "src/modules/neiro/services/neiro.store";
import {
  IPredictedValues,
  IPredictionResponse,
  LoadingStatusActionsEnum,
  LoadingStatusCodesEnum
} from "src/modules/neiro/types/neiro.types";


export class NeiroService extends Service {
  private store

  public constructor() {
    super();
    this.store = neiroStore();
  }

  // ------------------------------------------------------------------
  // Геттеры

  // ------------------------------------------------------------------
  // API запросы
  // todo: сделать асинхронным
  public getPrediction(values: IPredictedValues) {
    this.store.SET_PREDICTION_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    // todo: API запрос за предсказанием
    // todo: пока нет апи, сделать функцию, генерирующую рандомные значения
    const response = {} as IPredictionResponse;

    if (!response.failure) {
      this.store.ADD_PREDICTED_VALUES(response.payload);

      this.store.SET_PREDICTION_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });
    } else {
      this.store.SET_PREDICTION_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: response.errorCode,
        msg: response.errorMessage,
      })
    }
  }

  // ------------------------------------------------------------------
  // Методы
}