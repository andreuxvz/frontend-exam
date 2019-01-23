import Vue from 'vue';
import { ActionContext, ActionTree } from 'vuex';
import { AxiosResponse } from 'axios';
import { AppModel } from '@/store/general/models/app.model';
import User from '@/store/modules/auth/models/user.model';
import AuthState from '@/store/modules/auth/models/auth-state.model';

type AuthActionContext = ActionContext<AuthState, AppModel>;
type AuthActionTree = ActionTree<AuthState, AppModel>;

export const actions: AuthActionTree = {
  async login(context: AuthActionContext, payload: User): Promise<any> {
    try {
      Vue.axios.defaults.baseURL = 'http://localhost:3000/';
      const response: AxiosResponse = await Vue.axios({
        method: 'POST',
        url: 'login/',
        data: payload
      });
      context.commit('setUser', payload);
    } catch (error) {
      context.commit('authError', error.Message);
    } finally {
      console.log('Petición de login finalizada')
    }
  }
}
