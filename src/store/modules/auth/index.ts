import { Module } from 'vuex';
import { state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import AuthState from './models/auth-state.model';
import { AppModel } from '@/store/general/models/app.model';

const namespaced: boolean = true;

type AuthModule = Module<AuthState, AppModel>;

export const authModule: AuthModule = {
  namespaced,
  state,
  actions,
  mutations
}
