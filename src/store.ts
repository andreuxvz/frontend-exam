import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import vuexLocal from '@/plugins/vuex-persist';
import { authModule } from '@/store/modules/auth';
import { exchangeModule } from '@/store/modules/exchange';
import { AppModel } from '@/store/general/models/app.model';

Vue.use(Vuex);

const store: StoreOptions<AppModel> = {
  state: {
    appName: 'Vuejs 2 + Vuex',
    appVersion: '0.01'
  },
  modules: {
    authModule: authModule,
    exchangeModule: exchangeModule
  },
  plugins: [
    vuexLocal.plugin
  ]
};

export default new Vuex.Store<AppModel>(store);
