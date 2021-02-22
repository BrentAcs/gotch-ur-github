import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { GithubClientService } from './services/github-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gotch-ur-github';
  gitIgnoreTemplates: string [];

  constructor(private router: Router, private client: GithubClientService) {}

  ngOnInit() {
    // const builtTree = this.router.createUrlTree(['/gitignore/templates/C']);
    // this.logUrlTree( 'built: ', builtTree );
    // const parsedTree = this.router.parseUrl('/gitignore/templates/C');
    // this.logUrlTree('parsed: ', parsedTree);
    this.gitIgnoreTemplates = this.client.getGitIgnoreTemplates();
    console.log('templates length: ' + this.gitIgnoreTemplates.length);

    //this.client.getGitIgnoreTemplate('C');
  }

  logUrlTree(name: string, tree: UrlTree) {
    const f = tree.fragment;
    const q = tree.queryParams;
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    console.log('name: ' + name);
    console.log(tree);
    console.log(f);
    console.log(q);
    console.log(g);
    console.log(s);
  }
}
