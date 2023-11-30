import { UserModel } from '@core/model/user.interfaces';
import { createReducer, on } from '@ngrx/store';
import { loadUser, loadedUser } from '../actions';

export interface UserState {
  user: any;
  loading: boolean;
}

export const userState: UserState = {
  loading: false,
  user: null,
};

const userReducerMap = createReducer(
  userState,
  on(loadUser, (state) => ({ ...state, loading: true })),

  on(loadedUser, (state, { user }) => ({ ...state, loading: false, user })),
);

export const userReducer = (state: any, action: any) => userReducerMap(state, action);
