import { createAction, props } from '@ngrx/store';

export const itemLoad =
  createAction('[ITEM] Load', props<{ user: string }>());

export const itemLoaded =
  createAction('[ITEM] Loaded', props<{ item: any }>());

export const itemAdd =
  createAction('[ITEM] Add', props<{ item: any }>());

export const itemUpdate =
  createAction('[ITEM] Update', props<{ id: string; data: any }>());

export const itemRate =
  createAction( '[ITEM] Rating', props<{ id: string; data: any }>());

export const itemClosed =
  createAction('[ITEM] CLOSED', props<{ id: string; data: any }>());

export const itemDelete =
  createAction('[ITEM] Delete', props<{ id: string; data: any}>());

export const itemStatus =
  createAction('[ITEM] Changed', props<{ item: any}>());

export const itemError =
  createAction('[ITEM] Error', props<{ error: any }>());
