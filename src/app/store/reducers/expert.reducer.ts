import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ExpertState { items: any; loading: boolean };

export const expertState: ExpertState = { loading: false, items: null };

const expertReducerMap = createReducer(
  expertState,
  on(actions.expertLoad, (state) =>
    ({ ...state, loading: true })),

  on(actions.expertLoaded, (state, { items }) =>
    ({ ...state, loading: false, items })),

  on(actions.expertError, (state, { error }) =>
    ({...state, loading: false, error })),
);

export const expertReducer = (state: any, action: any) => expertReducerMap(state, action);
