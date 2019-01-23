import Vue from 'vue';
import {ActionContext, ActionTree} from 'vuex';
import ExchangeRequest from "@/store/modules/exchange/models/exchange-request.model";
import ExchangeState from "@/store/modules/exchange/models/exchange-state.model";
import { AppModel } from '@/store/general/models/app.model';
import { AxiosResponse } from 'axios';

type ExchangeActionContext = ActionContext<ExchangeState, AppModel>;
type ExchangeActionTree = ActionTree<ExchangeState, AppModel>;

export const actions: ExchangeActionTree = {
    async fetchData (context: ExchangeActionContext, payload: ExchangeRequest): Promise<any> {
      let {access_key} = payload;//must no exist...
      try {
          Vue.axios.defaults.baseURL = 'http://data.fixer.io/';

          const response: AxiosResponse = await Vue.axios({
            method: 'GET',
            url: 'api/latest',
            /*params: {
              access_key: access_key
            }*/
            params: payload
          });
          let {data} = response;
          if (response.status === 200 && response.data.success) {
            console.log('bottom top')
            context.commit('loadExchange', data);
            return data;
          } else {
            console.log('bottom')
            context.commit('exchangeLoadError', data.error.type);
            data.rates = {};
            return data;
          }
      } catch (e) {
          context.commit('exchangeLoadError', e.message);
      } finally {
          console.log('petición para obtener todos finalizada');
      }
    },
}
















