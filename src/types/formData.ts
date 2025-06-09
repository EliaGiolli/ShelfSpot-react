export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  error: RegisterError
}
interface RegisterError {
    message: string;
}

export interface AuthState {
  loading: boolean;
  userInfo: string[] | null;      
  userToken: string | null;
  error: string | null;
  success: boolean;
}
