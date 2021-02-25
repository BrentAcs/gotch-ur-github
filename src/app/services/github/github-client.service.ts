import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { gitIgnoreTemplate } from './models/github-client-models';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private baseUrl = 'https://api.github.com';

  private gitIgnoreTemplates: string[] = [];
  gitIgnoreTemplatesChanged = new Subject<string[]>();
  currentTemplateChanged = new Subject<gitIgnoreTemplate>();

  constructor(private http: HttpClient) {}

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
        const template = <gitIgnoreTemplate>posts;
        this.currentTemplateChanged.next(template);
      });
  }

  // ---- Endpoint: Users
  // public call: {{base_url}}/users/{{user_name}}
  // auth'd call: {{base_url}}/user


}
