import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { AppSettings } from "src/app/shared/app-settings.model";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  appSettings: AppSettings = new AppSettings();
  appSettingsChanged = new Subject<AppSettings>();

  constructor(){}

  load() {
    this.appSettings.usePublicApi = JSON.parse(
      LocalStorageService.getItem(AppSettings.USE_PUBLIC_API)
    );
  }

  save() {
    LocalStorageService.setItem(
      AppSettings.USE_PUBLIC_API,
      this.appSettings.usePublicApi.toString()
    );
  }

  clear() {
    this.appSettings.reset();
    this.save();
  }
}
