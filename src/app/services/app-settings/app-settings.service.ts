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
    console.log('app settings load');
    this.appSettings.useAccessToken = JSON.parse(
      LocalStorageService.getItem(AppSettings.USE_ACCESS_TOKEN_KEY)
    );
  }

  save() {
    console.log('app settings save');
    LocalStorageService.setItem(
      AppSettings.USE_ACCESS_TOKEN_KEY,
      this.appSettings.useAccessToken.toString()
    );
  }

  clear() {
    this.appSettings.reset();
    this.save();
  }
}
