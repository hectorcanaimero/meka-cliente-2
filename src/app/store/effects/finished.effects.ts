import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as action from '../actions';
import { MasterService } from '@core/services/master.service';



@Injectable()
export class FinishedEffects {
  history$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.finishedLoad),
      mergeMap(({ user }: any) => this.getData(user, 'closed')
        .pipe(
          map((finished) => action.finishedLoaded({ finished })),
          catchError(async ({ error }) => action.finishedError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: MasterService
  ) {}

  getData = (user: string, status: string): Observable<any[]> =>
    this.db.getMaster(`services/user/${user}/status/${status}`);

}
