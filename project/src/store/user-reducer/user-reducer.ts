import {createSlice} from '@reduxjs/toolkit';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {dropToken, saveToken} from '../../services/token';
import {UserState} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {NameSpace} from '../const';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const userReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
