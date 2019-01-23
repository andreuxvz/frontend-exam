<template>
  <div  class="background-gray">
    <b-container>
      <b-alert show variant="success" v-if="user">
        <h4 class="alert-heading"> Welcome to the exchange page!</h4>
      </b-alert>
      <br>
      <b-form @submit.prevent="calculate">
        <div class="row">
          <input type="hidden" v-model="request.base" value="USD">
          <div class="form-group col-sm-6">
            <label for="">{{base.name}}</label>
            <input type="text" class="form-control" placeholder="USD" v-model="base.num" @blur="formatCurrencyBase" @focus="unFormateBase">
            <label for="" ref="baseNumberCurrency" v-show="false">{{ base.num | currency(base.symbol, 4) }}</label>
          </div>
          <input type="hidden" v-model="request.symbols" value="EUR">
          <div class="form-group col-sm-6">
            <label for="">{{newbase.name}}</label>
            <label class="form-control" for="" >{{ newbase.num | currency(newbase.symbol, 4) }}</label>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col text-center">
            <button class="btn btn-primary text-uppercase" type="submit" style="width: 300px">
              Calculate
            </button>
          </div>
        </div>
        <br><br><br>
      </b-form>
      <br>
      <b-alert show variant="danger" v-if="errorMessage != ''">
        <h4 class="alert-heading"> {{errorMessage}}</h4>
      </b-alert>
    </b-container>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch} from "vue-property-decorator";
  import { Action, State } from "vuex-class";
  import { Route } from "vue-router";
  import constants from "@/constants";
  import User from "@/store/modules/auth/models/user.model";
  import ExchangeCurrencyModel from "@/store/modules/exchange/models/exchange.model";
  import ExchangeRequestModel from "@/store/modules/exchange/models/exchange-request.model";
  // @ts-ignore
  import Vue2Filters from 'vue2-filters';
  Vue.use(Vue2Filters);

  const namespaceAuth: string = "authModule";
  const namespaceExchange: string = "exchangeModule";

  Component.registerHooks([
    'beforeRouteEnter'
  ]);

  @Component({
    mixins: [Vue2Filters.mixin]
  })
  export default class Exchange extends Vue {
    public base: ExchangeCurrencyModel = {
      num: '£0',
      symbol: '€',
      desc: 'EUR',
      name: 'EURO',
      formated: false
    };
    public newbase: ExchangeCurrencyModel = {
      num: '$0',
      symbol: '$',
      desc: 'USD',
      name: 'DOLAR',
      formated: false
    };
    public request: Partial<ExchangeRequestModel> = {
      access_key: constants.access_key,
      base: this.base.desc,
      symbols: this.newbase.desc
    };
    public user: Partial<User> = {};
    public rate: number= 0;

    @Action('fetchData', {namespace: namespaceExchange}) fetchData!: Function;
    @State('isLogged', {namespace: namespaceAuth}) isLogged !: boolean;
    @State('user', {namespace: namespaceAuth}) userLogged !: User;
    @State('errorMessage', {namespace: namespaceExchange}) errorMessage !: User;


    async beforeRouteEnter (from: Route, to: Route, next: any) {
      next((vm: Exchange) => {
        if (!vm.isLogged) {
          next('/login');
        }
      })
    }

    calculate() {
      if (this.isGoodRate()) {
        let rate = localStorage.getItem("rate") || '0';
        this.setValNewbase(rate);
      } else{
        this.fetchData(this.request).then(({rates}: any) => {
          if (Object.entries(rates).length !== 0) {
            let rate = rates[this.newbase.desc];
            let nowTimestamp: Date = new Date();
            let nowTimestampStr = nowTimestamp.getTime().toString();
            this.setValNewbase(rate);
          }
        });
      }
    }

    storeRateInfo(nowTimestampStr: string, rate: string) {
      localStorage.setItem("rateTimestamp", nowTimestampStr);
      localStorage.setItem("rate", rate);
    }

    isGoodRate() {
      let actualRateTimestamp = localStorage.getItem("rateTimestamp");
      if (actualRateTimestamp) {
        let nowTimestamp: Date = new Date();
        let differenceInSecs: number = (nowTimestamp.getTime() - parseInt(actualRateTimestamp))/ 1000;
        if (differenceInSecs <= 600) {
          return true
        }
      }
      return false;
    }

    formatCurrencyBase() {
      let currencyItem = <HTMLElement>this.$refs.baseNumberCurrency;
      let currencyItemVal = currencyItem.innerHTML;
      this.base.num = currencyItemVal;
      this.base.formated = true;
    }

    unFormateBase() {
      this.base.num = this.getOriginalVal(this.base.num);
      this.base.formated = false;
      return this.base.num;
    }

    getOriginalVal(val: string) {
      return val.replace(',', '').replace(this.base.symbol, '');
    }

    setValNewbase(rate:string) {
      this.newbase.num = (parseFloat(this.getOriginalVal(this.base.num)) * parseFloat(rate)) + '';
    }
  }
</script>
