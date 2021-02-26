import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { gitIgnoreTemplate } from 'src/app/services/github/models/github-client-models';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-gitignore-templates',
  templateUrl: './gitignore-templates.component.html',
  styleUrls: ['./gitignore-templates.component.css'],
})
export class GitignoreTemplatesComponent extends BaseContentComponent implements OnInit, OnDestroy {
  // TODO: Template needs style improvements
  selectedTemplate: gitIgnoreTemplate = {
    name: '',
    source: '',
  };
  gitIgnoreTemplates: string[] = [];

  constructor(githubService: GithubClientService) {
    // doesn't use the AppUserService or AppSettingsService, so passing null.
    super(null, null, githubService);
  }

  ngOnInit(): void {
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
        this.selectedTemplate = template;
      }
    );
  }

  onChange(templateName) {
    this.githubService.getGitIgnoreTemplate(templateName);
  }
}
