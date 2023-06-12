import {defineStore} from "pinia";
import {
  CompanyNamesEnum,
  IPredictedValues,
  ISavedValues,
  LoadingStatusActionsEnum,
  LoadingStatusCodesEnum,
  NLoadingStatus
} from "src/modules/neiro/types/neiro.types";

export const neiroStore = defineStore({
  id: 'neiro',

  state: () => ({
    predictionLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      msg: '',
      errorCode: '',
    } as NLoadingStatus,

    companiesLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      msg: '',
      errorCode: '',
    } as NLoadingStatus,

    currentCompany: null as CompanyNamesEnum | null,
    predictedValues: null as ISavedValues | null,

    companies: null as CompanyNamesEnum[] | null,

  }),

  actions: {
    SET_CURRENT_COMPANY(company: CompanyNamesEnum | null) {
      this.currentCompany = company;
    },

    ADD_PREDICTED_VALUES(values: IPredictedValues) {
      if (!this.predictedValues) {
        this.predictedValues = {
          open: [values.open],
          close: [values.close],
          high: [values.high],
          low: [values.low],
          value: [values.value],
        }
        return;
      }

      this.predictedValues.value.push(values.value);
      this.predictedValues.low.push(values.low);
      this.predictedValues.close.push(values.close);
      this.predictedValues.high.push(values.high);
      this.predictedValues.open.push(values.open);
    },

    CLEAR_PREDICTED_VALUES() {
      this.predictedValues = null;
    },

    SET_PREDICTION_LOADING_STATUS(status: NLoadingStatus) {
      this.predictionLoadingStatus = {
        ...this.predictionLoadingStatus,
        ...status,
      }
    },

    SET_COMPANIES_LOADING_STATUS(status: NLoadingStatus) {
      this.companiesLoadingStatus = {
        ...this.companiesLoadingStatus,
        ...status,
      }
    },

    SET_COMPANIES_PAYLOAD(payload: CompanyNamesEnum[] | null) {
      this.companies = payload;
    }
  },
})