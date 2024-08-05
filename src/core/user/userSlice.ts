import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '@/api';
import { UserData } from './User.model';

type UserState = UserData;

const initialState: UserState = {
  id: '',
  username: '',
  email: ''
};

const fetchUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await api.getUser();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
    });
  }
});

export default userSlice.reducer;

export { fetchUser };
