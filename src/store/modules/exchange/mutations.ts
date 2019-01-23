import { MutationTree } from "vuex";
import ExchangeState from "@/store/modules/exchange/models/exchange-state.model";

type ExchangeMutationsTree = MutationTree<ExchangeState>;

export const mutations: ExchangeMutationsTree = {
    loadExchange (state: ExchangeState, data: any) {
        state.rates = data.rates;
        state.errorState = false;
        state.errorMessage = '';
    },

    exchangeLoadError (state: ExchangeState, payload: string) {
        state.errorState = true;
        state.errorMessage = payload;
        state.rates = {};
    }
};
