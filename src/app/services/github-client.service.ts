import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubClientService {
  private baseUrl = 'https://api.github.com';
  // private gitIgnoreTemplates: string[] = [];

  constructor(private http: HttpClient) {}

  // ---- Endpoint: gitignore
  getGitIgnoreTemplates(): string []{
    console.log('getGitIgnoreTemplates');
    let gitIgnoreTemplates: string [] = [];
    this.http
      .get<string[]>(this.baseUrl + '/gitignore/templates')
      .pipe(
        map((responseData) => {
          const postsArray: string[] = [];
          for (const key in responseData) {
            postsArray.push( key );
          }
          return postsArray;
        })
      )
      .subscribe((posts) => {
        // console.log('fetched posts:');
        // console.log(posts);
        gitIgnoreTemplates = posts;
        console.log('templates (in subscribe):');
        console.log(gitIgnoreTemplates);
      });
      console.log('returning this many templates: ' + gitIgnoreTemplates.length);
      return gitIgnoreTemplates;
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
