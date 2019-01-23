import { Module } from 'vuex';
import { state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import ExchangeStateModel from './models/exchange-state.model';
import { AppModel } from '@/store/general/models/app.model';

const namespaced: boolean = true;
type ExchangeModule = Module<ExchangeStateModel, AppModel>;

export const exchangeModule: ExchangeModule = {
  namespaced,
  state,
  actions,
  mutations
};
