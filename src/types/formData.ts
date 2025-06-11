import { User, userRole } from './userDataTypes'

export interface RegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role?: userRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterError {
    message: string;
}

export interface AuthState {
  loading: boolean;
  userInfo: any | null;
  error: string | null;
  success: boolean;
}
