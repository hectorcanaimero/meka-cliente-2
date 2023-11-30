import { StorageService } from 'src/app/core/services/storage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CapacitorHttp } from '@capacitor/core';
const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor(
    private storage: StorageService
  ) {
  }

  getCountries = async (token: string): Promise<any> => {
    try {
      const options = { url: `${api.url}/${api.version}/master/countries/` };
      const result = await CapacitorHttp.get(options);
      if (!result.data || !result.data.length) {
        return [];
      }
      return JSON.parse(result.data);
    } catch (err) {
      console.error('An error occurred loading all customers:', err);
      return [];
    }
  };

  getMasterTable = async (name: string): Promise<any> => {
    const token = await this.storage.getStorage('rootToken');
    try {
      const options = {
        url: `${api.url}/${api.version}/master/${name}/`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await CapacitorHttp.get(options);
      if (!result.data || !result.data.length) {
        return [];
      }
      return JSON.parse(result.data);
    } catch (err) {
      console.error('An error occurred loading all customers:', err);
      return [];
    }
  };

  getTable = async (name: string): Promise<any> => {
    const token = await this.storage.getStorage('token');
    try {
      const options = {
        url: `${api.url}/${api.version}/master/${name}/`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await CapacitorHttp.get(options);
      if (!result.data || !result.data.length) {
        return [];
      }
      return JSON.parse(result.data);
    } catch (err) {
      console.error('An error occurred loading all customers:', err);
      return [];
    }
  };

  getYears (init = 1960): any {
    const years = [];
    const currentTime = new Date();
    const now = currentTime.getFullYear();
    for (let index = init; index <= now; index++) {
      years.push(index);
    }
    return years;
  };

}
