import { createReducer, on } from '@ngrx/store';
import { finishedLoad, finishedLoaded, finishedError } from '../actions/finished.actions';

export interface FinishedState { finished: any; loading: boolean; error: any; total: number }
export const finishedState: FinishedState = { loading: false, finished: null, error: null, total: 0 };

const finishedReducerMap = createReducer(
  finishedState,
  on(finishedLoad, (state, { user }) => ({
    ...state, loading: true, user })),

  on(finishedLoaded, (state, { finished }) => ({
    ...state, loading: false, finished, total: finished.length })),

  on(finishedError, (state, { error }) => ({
  ...state, loading: false, error })),
);

export const finishedReducer = (state: any, action: any) => finishedReducerMap(state, action);
