import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface CancelledState { cancelled: any; loading: boolean; error: any; total: number }
export const cancelledState: CancelledState = { loading: false, cancelled: null, error: null, total: 0 };

const cancelledReducerMap = createReducer(
  cancelledState,
  on(actions.cancelledLoad, (state, { user }) => ({
    ...state, loading: true, user })),

  on(actions.cancelledLoaded, (state, { cancelled }) => ({
    ...state, loading: false, cancelled, total: cancelled.length })),

  on(actions.cancelledError, (state, { error }) => ({
  ...state, loading: false, error })),
);

export const cancelledReducer = (state: any, action: any) =>
  cancelledReducerMap(state, action);
