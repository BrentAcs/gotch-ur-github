import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  // ---- Endpoint: gitignore
  getGitIgnoreTemplates(){
    console.log('getGitIgnoreTemplates');
    let templates = [];
    this.http
      .get(this.baseUrl + '/gitignore/templates')
      .subscribe((posts) => {
        // console.log('fetched posts:');
        // console.log(posts);

        templates = <string[]>posts;
        console.log('templates:');
        console.log(templates);
      });
    return templates;
  }

  getGitIgnoreTemplate(name: string){
    console.log('getGitIgnoreTemplate');
    this.http
      .get(this.baseUrl + '/gitignore/templates/' + name)
      .subscribe((posts) => {
        console.log('fetched posts:');
        console.log(posts);
      });
  }
}
