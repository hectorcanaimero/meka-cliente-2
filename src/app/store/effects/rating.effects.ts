import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { MasterService } from '@core/services/master.service';

@Injectable()

export class RatingEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ratingLoad),
      mergeMap(() => this.getRating()
        .pipe(
          map((total) => actions.ratingLoaded({ total })),
          catchError(async ({ error }) => actions.ratingError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ms: MasterService,
  ) {}

  getRating = () =>
    this.ms.getMaster('ratings/').pipe(
      map((res: any) => res.total_score)
    );
}
