import { MutationTree } from 'Vuex';
import User from '@/store/modules/auth/models/user.model';
import AuthState from "@/store/modules/auth/models/auth-state.model";

type AuthMutationTree = MutationTree<AuthState>;

export const mutations: AuthMutationTree = {
  setUser (state: AuthState, user: User) {
    state.user = user,
    state.isLogged = true,
    state.errorState = false,
    state.errorMessage = ''
  },

  unsetUser (state: AuthState) {
    state.user = null,
    state.isLogged = false
  },

  authError (state: AuthState, payload: string) {
    state.errorState = false;
    state.errorMessage = payload;
    state.user = null;
    state.isLogged = false;
  }
}
