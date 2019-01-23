import ExchangeState from "@/store/modules/exchange/models/exchange-state.model";

export const state: ExchangeState = {
  request: null,
  rates: {},
  errorState: false,
  errorMessage: ''
};
