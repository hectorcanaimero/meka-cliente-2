import { createAction, props } from '@ngrx/store';

export const expertLoad =
  createAction('[EXPERT] Load');

export const expertLoaded =
  createAction('[EXPERT] Success', props<{ items: any[]}>());

export const expertError =
  createAction('[EXPERT] Error', props<{ error: any }>());
