import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  PRIMARY_OUTLET,
  Router,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { gitIgnoreTemplate } from './services/github-client-models';

import { GithubClientService } from './services/github-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  gitIgnoreTemplate: gitIgnoreTemplate;
  gitIngnoreTemplatesFormGroup = new FormGroup({
    gitIgnoreTemplate: new FormControl(),
    gitIgnoreTemplates: new FormControl(),
  });

  title = 'gotch-ur-github';
  gitIgnoreTemplates: string[] = [];
  // gitIgnoreTemplate: gitIgnoreTemplate = {
  //   name: 'Sample',
  //   source: 'some content explained\nand this explains it.',
  // };

  constructor(
    private router: Router,
    private githubService: GithubClientService
  ) {}

  ngOnInit() {
    this.githubService.gitIgnoreTemplatesChanged.subscribe(
      (ignores: string[]) => {
        // console.log('ignores:');
        // console.log(ignores);
        this.gitIgnoreTemplates = ignores;
      }
    );
    this.githubService.getGitIgnoreTemplates();

    this.githubService.currentTemplateChanged.subscribe(
      (template: gitIgnoreTemplate) => {
        console.log('currentTemplateChanged()');
        console.log(template);
        this.gitIgnoreTemplate = template;
      }
    );
  }

  onChange(aValue) {
    console.log('selected template changed: ');
    console.log(this.gitIgnoreTemplate);
    this.githubService.getGitIgnoreTemplate(this.gitIgnoreTemplate.name);
  }

  onChangeBACKUP(templateName) {
    console.log('selected template changed: ' + templateName);
    //this.githubService.getGitIgnoreTemplate(this.currentTemplate);
    this.githubService.getGitIgnoreTemplate(templateName);
  }

  onTest() {
    this.gitIgnoreTemplate = {
      name: 'Sample 2',
      source:
        'even more content and some content explained\nand this explains it.',
    };
  }
}
