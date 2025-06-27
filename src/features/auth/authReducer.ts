import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userRole } from "../../types/userDataTypes";
import { RegisterFormData, LoginFormData, AuthState } from "../../types/formData";

const initialState: AuthState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'), // <-- hydrate from localStorage
  error: null,
  success: false,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterFormData, { rejectWithValue }) => {
    try {
      // Check if user already exists
      const existingUser = await axios.get(`${API_BASE_URL}users?email=${userData.email}`);
      if (existingUser.data.length > 0) {
        throw new Error('User already exists');
      }

      // Create new user with lowercase role
      const response = await axios.post(`${API_BASE_URL}users`, {
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        name: userData.name,
        lastName: userData.lastName,
        role: userRole.Member.toLowerCase()
      });
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Registration failed'
      );
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      // Find user by email
      const response = await axios.get(`${API_BASE_URL}users?email=${credentials.email}`);
      const user = response.data[0];
      
      if (!user) {
        throw new Error('User not found');
      }

      // Check password (in a real app, this would be hashed)
      if (user.password !== credentials.password) {
        throw new Error('Invalid password');
      }

      // Don't send password back to client and ensure role is lowercase
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        role: userWithoutPassword.role?.toLowerCase() || 'guest'
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout reducer triggered')
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.success = false;
    },
  },
  //extraReducers handle external actions such as async thunks or actions definded outside the slice
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'unknown error';
      })
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;