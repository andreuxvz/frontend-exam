import Vue from 'vue';
import {AxiosRequestConfig, AxiosResponse, AxiosInstance} from 'axios';

declare module 'vue/types/vue' {
  interface VueConstructor {
    axios: AxiosInstance
  }
}

export namespace Http {
  export class ApiJwtService {
    constructor() {
      this.request();
    }

    protected request() {
      Vue.axios.interceptors.request.use((config: AxiosRequestConfig) => {
        return config;
      }, (err: any) => {
        console.log('axios request error')
      })
    }

    protected response() {
      Vue.axios.interceptors.response.use((reponse: AxiosResponse) => {
        return reponse;
      }, (err: any) => {
        console.log('axios request error');
        return Promise.reject(err);
      })
    }


  }
}
