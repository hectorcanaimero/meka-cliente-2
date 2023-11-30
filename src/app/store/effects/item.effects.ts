/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as actions from '../actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { Socket } from 'ngx-socket-io';
import { ChatFireService } from '@core/services/chat-fire.service';
import { StorageService } from '@core/services/storage.service';

@Injectable()

export class ItemEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemLoad),
      mergeMap((action: any) => this.db.getServiceActive(action.user)
        .pipe(
          map(item => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemAdd),
      mergeMap((action: any) => this.createService(action.item)
        .pipe(
          map((item: any) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemUpdate),
      mergeMap((action: any) => this.changeStatusService(action.id, action.data)
        .pipe(
          map((item: any) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  changed$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.itemStatus),
    map((action) => actions.itemLoaded({ item: action.item }))
  )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemDelete),
      mergeMap((action: any) => this.changeStatusService(action.id, action.data)
        .pipe(
          map((item) => actions.itemLoaded({ item: null })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  closed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemClosed),
      mergeMap(({ id, data }) => this.changeStatusService(id, data)
        .pipe(
          map((item: any) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  constructor(
    private socket: Socket,
    private ms: MasterService,
    private actions$: Actions,
    private db: DbCategoriesService,
    private storage: StorageService,
    private firestore: ChatFireService,
  ) {}

  updateService(id: string, data: any) {
    return this.ms.patch2Master(`services/${id}`, data).pipe(
      map(async (res: any) => {
        await this.createRoom(res);
        await this.closeRoom(res);
        return res;
      })
    );
  }

  createService(item: any) {
    console.log('STORE', item);
    return this.ms.postMaster('services/user', item);
  }

  changeStatusService(id: string, item: any) {
    const data = { id, item };
    this.socket.emit('joinService', id);
    this.socket.emit('changeStatusService', data);
    return this.socket.fromEvent('changeMessage');
  }

  getServiceActive(id: string) {
    return this.db.getServiceActive(id).pipe(
      switchMap((res: any) => this.firestore.getRoom(res._id))
    );
  }

  private async createRoom(item: any) {
    if (item.status === 'in_process') {
      await this.firestore.createRoom(item);
      await this.storage.setStorageValue('service', item._id);
    }
  }

  private async closeRoom(item: any) {
    console.log(item);
    if (item.status === 'cancelled') {
      await this.firestore.removeRoom(item._id);
      await this.storage.removeStorage('service');
    }
  }
}
