import { UserModel } from '@core/model/user.interfaces';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load', props< { user: any }>()
);

export const loadedUser = createAction(
  '[User] Loaded', props<{ user: any }>()
);
