import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { GitignoreTemplatesComponent } from './content/gitignore-templates/gitignore-templates.component';
import { ReposComponent } from './content/repos/repos.component';
import { UsersComponent } from './content/users/users.component';
import { HomeComponent } from './content/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'repos', component: ReposComponent },
  { path: 'gitignore-templates', component: GitignoreTemplatesComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not Found!' },
  },

  // NOTE: '**' is wildcard catch-all and should always be last entry in routing list.
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  // use case: location strategy on a deployed app, may be needed.
  //imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
