import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RegisterFormData, AuthState } from "../../types/formData";


const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
};


export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${userId}`);
            return response.data;
        } catch(error:any){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/users", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/loginUser',
  async ( credentials: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/login', credentials);
      // Assuming your API returns { user: ..., token: ... }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = ( action.payload as string) || 'unknown error';
      })
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = ( action.payload as string) || 'unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;