import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async setStorage (key: string, value: any): Promise<any> {
    await Preferences.set({ key, value: JSON.stringify(value)});
  };

  async setStorageValue (key: string, value: any): Promise<any> {
    await Preferences.set({ key, value});
  };

  async getStorage (key: string): Promise<any> {
    const response: any = await Preferences.get({ key });
    return JSON.parse(response.value);
  };

  async getStorageValue (key: string): Promise<any> {
    const { value } = await Preferences.get({ key });
    return value;
  };

  async removeStorage (key: string): Promise<any> {
    await Preferences.remove({ key });
  };

  async clearStorages (): Promise<any> {
    await Preferences.clear();
  };
}
