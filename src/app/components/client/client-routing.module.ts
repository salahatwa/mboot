import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ClientAuthResolver } from './client-auth-resolver.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: 'home',
    component: ClientComponent,
    resolve: {
      isAuthenticated: ClientAuthResolver
    }
  },
  
  {
    path: 'profile',
    loadChildren: './components/profile/profile.module#ProfileModule'
  },
  {
    path: 'settings',
    loadChildren: './components/settings/settings.module#SettingsModule'
  },
  {
    path: 'information',
    loadChildren: './components/information/information.module#InformationModule'
  },
  {
    path: 'request-view',
    loadChildren: './components/request/request-view.module#RequestViewModule'
  },
  {
    path: 'editor',
    loadChildren: './components/editor/editor.module#EditorModule'
  },
  {
    path: 'article',
    loadChildren: './components/article/article.module#ArticleModule'
  }
];

@NgModule({
  imports: [CommonModule,BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
