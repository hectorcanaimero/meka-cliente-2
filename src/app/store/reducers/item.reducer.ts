import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface ItemState { item: any; loading: boolean; error: any  };
export const itemState: ItemState = { loading: false, item: null, error: null };

const itemReducerMap = createReducer(
  itemState,
  on(actions.itemLoad, (state, { user }) =>
    ({ ...state, loading: true, user })),

  on(actions.itemLoaded, (state, { item }) =>
    ({ ...state, loading: false, item })),

  on(actions.itemUpdate, (state, { id, data }) =>
  ({ ...state, loading: true, id, data })),

  on(actions.itemDelete, (state, { id, data }) =>
  ({ ...state, loading: true, id, data })),

  on(actions.itemClosed, (state, { id, data }) =>
  ({ ...state, loading: true, id, data })),

  on(actions.itemStatus, (state, { item }) =>
  ({ ...state, loading: true, item })),

  on(actions.itemRate, (state, { id, data }) =>
  ({ ...state, loading: true, id, data })),

  on(actions.itemError, (state, { error }) =>
    ({ ...state, loading: false, error })),
);

export const itemReducer = (state: any, action: any) => itemReducerMap(state, action);
