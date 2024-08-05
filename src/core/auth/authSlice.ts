import { createSlice, createAsyncThunk, isAnyOf, bindActionCreators } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import * as api from '@/api';
import { getCustomUserError } from '@/api/error';
import { fetchUser } from '@/core/user/userSlice';
import { logoutHelper, setAuthHeader } from './helpers';

type AuthSliceState = {
  loggedIn: boolean;
  isLoginPending: boolean;
  token: string | null;
};

const initialState: AuthSliceState = {
  loggedIn: false,
  isLoginPending: true,
  token: null
};

const logoutUser = createAsyncThunk('auth/logoutUser', () => logoutHelper());

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (args: api.LoginUserArgs, { dispatch, rejectWithValue }) => {
    let token;

    try {
      token = await api.loginUser(args);
    } catch (err) {
      return rejectWithValue(err);
    }

    await setAuthHeader(token, bindActionCreators(logoutUser, dispatch));
    await dispatch(fetchUser());

    return token;
  }
);

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (args: api.RegisterUserArgs, { dispatch, rejectWithValue }) => {
    let token;

    try {
      token = await api.registerUser(args);
    } catch (err) {
      return rejectWithValue(err);
    }

    await setAuthHeader(token, bindActionCreators(logoutUser, dispatch));
    await dispatch(fetchUser());

    return token;
  }
);

const authenticateOAuth = createAsyncThunk(
  'auth/authenticateOAuth',
  async (args: api.AuthenticateOAuthArgs, { dispatch, rejectWithValue }) => {
    let token;

    try {
      token = await api.googleOAuthUser(args);
    } catch (err) {
      return rejectWithValue(err);
    }

    await setAuthHeader(token, bindActionCreators(logoutUser, dispatch));
    await dispatch(fetchUser());

    return token;
  }
);

type RetrieveTokenArgs = {
  token?: string | null;
};

const retrieveToken = createAsyncThunk(
  'auth/retrieveToken',
  async ({ token }: RetrieveTokenArgs, { dispatch, rejectWithValue }) => {
    if (!token) {
      return rejectWithValue('token not found');
    }

    try {
      await setAuthHeader(token, bindActionCreators(logoutUser, dispatch));
      await dispatch(fetchUser());
    } catch (err) {
      return rejectWithValue(err);
    }

    return token;
  }
);

const sendResetPasswordEmail = createAsyncThunk(
  'auth/sendResetPasswordEmail',
  async (args: api.SendResetPasswordEmailArgs, { rejectWithValue }) => {
    try {
      await api.sendResetPasswordEmail(args);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (args: api.ResetPasswordArgs, { dispatch, rejectWithValue }) => {
    let token;

    try {
      token = await api.resetPassword(args);
    } catch (err) {
      return rejectWithValue(err);
    }

    await setAuthHeader(token, bindActionCreators(logoutUser, dispatch));
    await dispatch(fetchUser());

    return token;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loggedIn = false;
      state.token = null;
    });
    builder.addCase(retrieveToken.pending, (state) => {
      state.isLoginPending = true;
    });
    builder.addCase(retrieveToken.rejected, (state) => {
      state.isLoginPending = false;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      const err = action.payload as api.ApiError;
      toast.error(getCustomUserError(err, 'Failed to reset password'));
    });

    builder.addCase(sendResetPasswordEmail.rejected, (state, action) => {
      const err = action.payload as api.ApiError;
      toast.error(getCustomUserError(err, 'Failed to send reset password email'));
    });

    builder.addMatcher(
      isAnyOf(
        loginUser.fulfilled,
        retrieveToken.fulfilled,
        registerUser.fulfilled,
        authenticateOAuth.fulfilled,
        resetPassword.fulfilled
      ),
      (state, { payload }) => {
        state.isLoginPending = false;
        state.loggedIn = true;
        state.token = payload;
      }
    );
  }
});

const { setLoggedIn } = authSlice.actions;
export { setLoggedIn };

export default authSlice.reducer;

export {
  loginUser,
  logoutUser,
  registerUser,
  authenticateOAuth,
  retrieveToken,
  sendResetPasswordEmail,
  resetPassword
};
