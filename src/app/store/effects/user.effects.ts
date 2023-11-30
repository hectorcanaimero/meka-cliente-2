import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as userActions from '@store/actions/user.actions';

@Injectable()
export class UserEffects {

  login$ =
  createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      map((user: any) =>
        userActions.loadedUser({ user })),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
  ) {}

}
