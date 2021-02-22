import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { gitIgnoreTemplate } from './github-client-models';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private baseUrl = 'https://api.github.com';
  private gitIgnoreTemplates: string[] = [];
  //private currentTemplate: gitIgnoreTemplate;
  gitIgnoreTemplatesChanged = new Subject<string[]>();
  currentTemplateChanged = new Subject<gitIgnoreTemplate>();

  constructor(private http: HttpClient) {}

  // ---- Endpoint: gitignore
  getGitIgnoreTemplates() {
    console.log('getGitIgnoreTemplates');
    this.http
      .get<string[]>(this.baseUrl + '/gitignore/templates')
      .subscribe((posts) => {
        // console.log('templates (in subscribe):');
        // console.log(this.gitIgnoreTemplates);
        this.gitIgnoreTemplates = posts;
        this.gitIgnoreTemplatesChanged.next(this.gitIgnoreTemplates.slice());
      });
  }

  getGitIgnoreTemplate(name: string) {
    console.log('getGitIgnoreTemplate: ' + name);
    this.http
      .get(this.baseUrl + '/gitignore/templates/' + name)
      .subscribe((posts) => {
        // console.log('fetched posts:');
        // console.log(posts);
        const template = <gitIgnoreTemplate>posts;
        this.currentTemplateChanged.next(template);
      });
  }
}
