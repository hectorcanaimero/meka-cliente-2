import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as actions from '@store/actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

@Injectable()
export class ExpertEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.expertLoad),
      mergeMap(() => this.db.getTypeExpert()
        .pipe(
          map((items) => actions.expertLoaded({ items })),
          catchError(async ({ error }) => actions.expertError({ error }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private db: DbCategoriesService,
  ) {}
}
