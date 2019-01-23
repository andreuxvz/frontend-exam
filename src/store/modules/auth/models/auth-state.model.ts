import User from '@/store/modules/auth/models/user.model'

export default interface AuthState {
  user: User | null;
  isLogged  : boolean;
  errorState: boolean;
  errorMessage: string;
}
