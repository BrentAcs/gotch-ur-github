import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { gitIgnoreTemplate } from './services/github-client-models';
import { GithubClientService } from './services/github-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gotch-ur-github';
  selectedTemplate: gitIgnoreTemplate = {
    name: '',
    source: ''
  };
  gitIgnoreTemplates: string[] = [];

  constructor(
    private router: Router,
    private githubService: GithubClientService
  ) {}

  ngOnInit() {
    this.githubService.gitIgnoreTemplatesChanged.subscribe(
      (ignores: string[]) => {
        this.gitIgnoreTemplates = ignores;
        if (this.selectedTemplate.name === '') {
          this.onChange(this.gitIgnoreTemplates[0]);
        }
      }
    );
    this.githubService.getGitIgnoreTemplates();

    this.githubService.currentTemplateChanged.subscribe(
      (template: gitIgnoreTemplate) => {
        console.log('currentTemplateChanged()');
        console.log(template);
        this.selectedTemplate = template;
      }
    );
  }

  onChange(templateName) {
    this.githubService.getGitIgnoreTemplate(templateName);
  }

  onTest() {
    this.selectedTemplate = {
      name: 'Sample 2',
      source:
        'even more content and some content explained\nand this explains it.',
    };
  }
}
