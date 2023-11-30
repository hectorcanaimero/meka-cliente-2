import { cancelledLoad } from './../actions/cancelled.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as action from '../actions';
import { MasterService } from '@core/services/master.service';
import { Observable } from 'rxjs';


@Injectable()
export class CancelledEffects {
  services$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.cancelledLoad),
      mergeMap(({ user }: any) => this.getData(user, 'cancelled')
        .pipe(
          map((cancelled) => action.cancelledLoaded({ cancelled })),
          catchError(async ({ error }) => action.cancelledError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: MasterService
  ) {}

  getData = (user: string, status: string): Observable<any[]> =>
      this.db.getMaster(`services/user/${user}/status/${status}`);}
