<template>
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">Sign In</h5>
          <br>
          <b-alert show variant="danger" v-if="errorState">
            {{ errorMessage }}
          </b-alert>

          <b-form @submit.prevent="signIn">
            <label for="inputEmail">Email address</label>
            <div class="form-label-group">
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                v-model="user.email"
                required
                autofocus/>
            </div>
            <br>
            <div class="form-label-group">
              <label for="inputPassword">Password</label>
              <input
              type="password"
              id="inputPassword"
              class="form-control"
              v-model="user.password"
              placeholder="Password"
              required>
            </div>
            <br>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" >
              Sign in
            </button>
            <hr class="my-4">
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue} from "vue-property-decorator";
  import { Action, State } from "vuex-class";
  import { Route } from "vue-router";
  import User from "@/store/modules/auth/models/user.model";
  // @ts-ignore
  const namespace: string = "authModule";

  Component.registerHooks([
    'beforeRouteEnter'
  ]);

  @Component({})
  export default class Login extends Vue {
    public user: Partial<User> = {}

    @State('isLogged', {namespace}) isLogged !: boolean;
    @State('errorState', {namespace}) errorState !: boolean;
    @State('errorMessage', {namespace}) errorMessage !: boolean;
    @Action('login', {namespace}) login !: Function;

    signIn(): void {
      this.login(this.user).then(() => {
        if (!this.errorState) {
          this.$router.push('/exchange');
        }
      })
    }

    async beforeRouteEnter (from: Route, to: Route, next: any) {
      next((vm: Login) => {
        if (vm.isLogged) {
          next('/exchange');
        }
      })
    }
  }

</script>
