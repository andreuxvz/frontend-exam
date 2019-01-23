import AuthState from "@/store/modules/auth/models/auth-state.model";

export const state: AuthState = {
  user: null,
  isLogged: false,
  errorState: false,
  errorMessage: ''
}
