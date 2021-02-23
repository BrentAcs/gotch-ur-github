import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { gitIgnoreTemplate } from 'src/app/services/github-client-models';
import { GithubClientService } from 'src/app/services/github-client.service';

@Component({
  selector: 'app-gitignore-templates',
  templateUrl: './gitignore-templates.component.html',
  styleUrls: ['./gitignore-templates.component.css'],
})
export class GitignoreTemplatesComponent implements OnInit {
  selectedTemplate: gitIgnoreTemplate = {
    name: '',
    source: '',
  };
  gitIgnoreTemplates: string[] = [];

  constructor(
    private router: Router,
    private githubService: GithubClientService
  ) {}

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
