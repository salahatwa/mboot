import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, ActivatedRoute, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Article } from '../../entities';
import { UserService } from './../../../../shared/shared-services/core';
import { ArticlesService } from '../../services';


import { filter, map } from 'rxjs/operators';

@Injectable()
export class ArticleResolver implements Resolve<Article> {


  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    let sumbittedModel=this.router.getCurrentNavigation().extras.state;
    console.log(sumbittedModel);
    
    localStorage.setItem("submitedData",sumbittedModel+'');

    return this.articlesService.get(route.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
