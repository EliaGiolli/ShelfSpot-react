import { User } from './userDataTypes'

export interface RegisterFormData {
  name?: string;
  email: string;
  password: string;
}
export interface RegisterError {
    message: string;
}

export interface AuthState {
  loading: boolean;
  userInfo: User | null;      
  userToken: string | null;
  error: string | null;
  success: boolean;
}
