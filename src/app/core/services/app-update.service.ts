import { Injectable } from '@angular/core';
import { AppUpdate, AppUpdateAvailability, AppUpdateInfo } from '@capawesome/capacitor-app-update';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateProvider {
  async getAppUpdateInfo(): Promise<AppUpdateInfo> {
    const result = await AppUpdate.getAppUpdateInfo();
    return result;
  };

  async getAvailableAppVersion(): Promise<string> {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.availableVersion;
  };

  async openAppStore(): Promise<void> {
    await AppUpdate.openAppStore();
  };

  async performImmediateUpdate(result: AppUpdateInfo): Promise<void> {
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.immediateUpdateAllowed) {
      await AppUpdate.performImmediateUpdate();
    }
  };

  async startFlexibleUpdate(): Promise<void> {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.flexibleUpdateAllowed) {
      await AppUpdate.startFlexibleUpdate();
    }
  };

  async completeFlexibleUpdate(): Promise<void> {
    await AppUpdate.completeFlexibleUpdate();
  };
}
