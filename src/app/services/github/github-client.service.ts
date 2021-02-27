import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AppUserService } from '../app-user/app-user.service';
import { IGitIgnoreTemplate } from './models/git-ignore-template.model';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { map } from 'rxjs/operators';
import {
  IGitHubUserAuthd,
  IGitHubUserPublic,
  toGitHubUserAuthd,
  toGitHubUserPublic,
} from './models/github-user.model';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private baseUrl = 'https://api.github.com';

  private gitIgnoreTemplates: string[] = [];
  gitIgnoreTemplatesChanged = new Subject<string[]>();
  currentTemplateChanged = new Subject<IGitIgnoreTemplate>();

  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService,
    private http: HttpClient
  ) {}

  // ---- Endpoint: gitignore
  getGitIgnoreTemplates() {
    this.http
      .get<string[]>(this.baseUrl + '/gitignore/templates')
      .subscribe((posts) => {
        this.gitIgnoreTemplates = posts;
        this.gitIgnoreTemplatesChanged.next(this.gitIgnoreTemplates.slice());
      });
  }

  getGitIgnoreTemplate(name: string) {
    this.http
      .get(this.baseUrl + '/gitignore/templates/' + name)
      .subscribe((posts) => {
        const template = <IGitIgnoreTemplate>posts;
        this.currentTemplateChanged.next(template);
      });
  }

  // ---- Endpoint: Users
  // public call: {{base_url}}/users/{{user_name}}
  // auth'd call: {{base_url}}/user

  getUser() {
    if (this.appSettingsService.appSettings.useAccessToken) {
      return this.http
        .get<IGitHubUserAuthd>(this.baseUrl + '/user', {
          headers: new HttpHeaders({
            Authorization: 'token ' + this.appUserService.appUser.accessToken,
          }),
        })
        .pipe(
          map((responseData) => { return toGitHubUserAuthd(responseData);
            // return {
            //   login: responseData.login,
            //   id: responseData.id,
            //   node_id: responseData.node_id,
            //   name: responseData.name,
            //   disk_usage: responseData.disk_usage,
            // };
          })
        );
    } else {
      return this.http
        .get<IGitHubUserPublic>(
          this.baseUrl + '/users/' + this.appUserService.appUser.name
        )
        .pipe(
          map((responseData) => {
            return toGitHubUserPublic(responseData);
          })
        );
    }
  }
}
