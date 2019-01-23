<template>
  <div id="app">
    <b-container>
      <div class="home">
        <img alt="Exchange logo" src="./assets/logo.png" style="max-width: 100%">
        <h1 class="text-center text-muted">Exchange rate IO</h1>
      </div>
      <br>
      <br>
      <b-nav pills class="justify-content-center">
        <b-nav-item to="/login" v-if="!isLogged" :active="currentPath == '/login'"><h4>Login</h4></b-nav-item>
        <b-nav-item to="/exchange" :active="currentPath == '/exchange'"><h4>Exchange</h4></b-nav-item>
        <b-nav-item v-if="isLogged" @click.prevent="logout"><h4>Logout</h4></b-nav-item>
      </b-nav>
    </b-container>
    <br><br>
    <router-view/>
    <b-alert show variant="info" class="no-margin-bottom">
      © All right reserved
    </b-alert>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Action, State } from "vuex-class";
  import AuthMixin from '@/mixins/AuthMixin';
  const namespace: string = "authModule";

  @Component({
    mixins: [AuthMixin]
  })
  export default class App extends Vue {
    @State('isLogged', {namespace}) isLogged !: boolean;
    public currentPath: string = '/login';

    @Watch('$route.path', {immediate: true})
    changeRoute(path: string): void {
      this.currentPath = path;
    }
  }
</script>

<style scoped src="@/assets/css/app.css">
</style>
