import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userRole } from "../../types/userDataTypes";
import { RegisterFormData, LoginFormData, AuthState } from "../../types/formData";


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
      // Register the user with json-server-auth
      const response = await axios.post("http://localhost:5000/register", {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        lastName: userData.lastName,
        role: userRole.Guest
      });
      
      if (response.data && response.data.accessToken) {
        return {
          user: {
            id: Date.now(),
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userRole.Guest
          },
          token: response.data.accessToken
        };
      }
      
      throw new Error('Registration failed - no token received');
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
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
      // Login with email and password
      const response = await axios.post('http://localhost:5000/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      if (response.data && response.data.accessToken) {
        // Get user profile with the token
        const userResponse = await axios.get(`http://localhost:5000/600/users?email=${credentials.email}`, {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`
          }
        });
        
        const user = userResponse.data[0];
        
        if (!user) {
          throw new Error('User profile not found');
        }
        
        return {
          user,
          token: response.data.accessToken
        };
      }
      
      throw new Error('Login failed - no token received');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
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
        localStorage.setItem('userToken', action.payload.token);
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