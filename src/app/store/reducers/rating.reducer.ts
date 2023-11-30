import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface RatingState { total: number; loading: boolean; error: any  };
export const ratingState: RatingState = { loading: false, total: 0, error: null };

const ratingReducerMap = createReducer(
  ratingState,
  on(actions.ratingLoad, (state) =>
    ({ ...state, loading: true })),

  on(actions.ratingLoaded, (state, { total }) =>
    ({ ...state, loading: false, total })),

  on(actions.ratingUpdate, (state, { total }) =>
  ({ ...state, loading: true, total })),

  on(actions.ratingError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const ratingReducer = (state: any, action: any) => ratingReducerMap(state, action);
