import { createAction, props } from '@ngrx/store';

export const ratingLoad = createAction('[RATINGS] Load');

export const ratingLoaded = createAction( '[RATINGS] Loaded', props<{ total: any}>() );

export const ratingUpdate = createAction( '[RATINGS] Update', props<{ total: any }>() );

export const ratingError = createAction( '[RATINGS] Error', props<{ error: any }>() );
