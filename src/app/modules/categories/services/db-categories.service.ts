import { Injectable } from '@angular/core';
import { MasterService } from '@core/services/master.service';
import { Geolocation } from '@capacitor/geolocation';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StringFormat } from 'firebase/storage';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';

@Injectable({
  providedIn: 'root'
})
export class DbCategoriesService {
  constructor(
    private ms: MasterService,
    private store: Store<AppState>,
  ) {}

  // TODO: Get Tipo de Vehiculos
  getVehicles = () =>
    this.ms.getMaster('tables/vehicles');

  // TODO: Get todas las Marcas
  getBrand = (type: any) =>
    this.ms.getMaster(`tables/brands`);

    getBrandByType = (type: any) =>
    this.ms.getMaster(`tables/brands/type/${type}`);

  //TODO: Get los modelos por marcas
  getModel = (brand: any) =>
    this.ms.getMaster(`tables/models/brand/${brand}`);
  // TODO: Get conditions pieces
  getTypeCondition = () =>
    this.ms.getMaster('tables/conditions');

  // TODO: Add Services
  setServices = (data: any) =>
    this.ms.postMaster('services/user', data);

  // TODO: GET STATUS SERVICE
  getStatusServices = (status: string): Observable<any[]> =>
      this.ms.getMaster(`services/status/${status}`);

  //TODO: GET PROVIDER
  getProviderByServise = (data: any): Observable<any> =>
    this.ms.postMaster('companies/service', data);

  getIcone = () => this.ms.getMaster('master/expert/');

    setPhotos(data: any) {
      return this.ms.postMaster('services/user/photo', data);
    }
  getServicesClosed = () => this.ms.getMaster(`service/request/history/?ordering=-date_reg`).pipe(map((res: any) => res.search));

  // TODO: Get Categories
  getTypeExpert = () => this.ms.getMaster('tables/categories');

  closedlService = (id: any) => this.ms.patchMaster('service/request', id, { status: 'CLOSED' });
  cancelService = (id: any) => this.ms.patchMaster('service/request', id, { status: 'CANCELLED' });

  deleteService = (id: any) => this.ms.patchMaster('service/request', id, { is_delete: true });

  getCompanies = (company: number, expert: number, lat: any, lng: any) => {
    const query = `?longitude=${lng}&latitude=${lat}&type_expert=${expert}&type_company=${company}`;
    return this.ms.getMaster(`user/company/list${query}`);
  };
  // getCompanies = (company: number, expert: number, lat: any, lng: any) => this.ms.getMaster(
  //   `user/company/list?longitude=z1&latitude=-25.51531&type_expert=5&type_company=1`);

  // TODO: GET Last Service
  getService = () => this.ms.getMaster(`service/request/list/?ordering=-date_reg&number_items_page=1`).pipe();

  getServiceEditStatus = (status: string, item: any) => {};

  //TODO: UPDATE Service
  sendService = (id: string, data: any) =>
    this.ms.patch2Master(`services/${id}`, data);

  // TODO: VERIFY Status the Service
  getChangedStatusService = (id: number) =>
    this.ms.getMaster(`service/request/${id}`);


  // TODO: Busqueda de Servicio OPEN, IN_PROCESS, ACCEPTED
  getServiceActive(user: string) {
    return this.ms.getMaster(`services/user/${user}`);
  }

    // TODO: Busqueda de Servicio CLOSED sem Rating
  getService1Active() {
    return this.ms.getMaster(`service/request/list/?ordering=-date_reg`).pipe(

    );
  }



    // TODO: Busqueda de Servicio CLOSED com Rating
  getService2Active() {
    return this.ms.getMaster(`service/request/list/?ordering=-date_reg`).pipe(
      map((res: any) => res.search),
      map((res: any) => res.filter((row: any) => row.status === 'CLOSED')),
      map((res: any) => res.filter((row: any) => row.rating?.company.score !== null)),
      map(res => res[0])
    );
  };

  // TODO: change Status via REDUX
  changeStatusRedux(status: string) {
    return this.store.select('item').pipe(
      filter(row => !row.loading),
      map((res: any) => {
        const data = res.item;
        data.status = status;
        return data;
      })
    );
  }

  // TODO: Rating Company
  setRate = (id: string, data: any) =>
    this.ms.patch2Master(`comments/service/${id}`, data);

}
