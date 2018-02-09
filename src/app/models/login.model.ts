export interface LoginState {
  email: string;
  password: string;
  error: boolean;
  errors: string[];
  pending: boolean;
}
