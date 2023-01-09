import {mainReducer} from './main-reducer/main-reducer';
import {filmReducer} from './film-reducer/film-reducer';
import {userReducer} from './user-reducer/user-reducer';
import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from './const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: mainReducer.reducer,
  [NameSpace.Film]: filmReducer.reducer,
  [NameSpace.User]: userReducer.reducer
});
