import { Component, Input } from '@angular/core';
import { Article } from '../../entities';
import { ProfilesService, ArticlesService } from '../../services';
import { UserService } from './../../../../shared/shared-services/core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls:['article-preview.component.css']
})
export class ArticlePreviewComponent {

  isSubmitting:boolean=false;

  @Input() article: Article;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}


  toggleFavorite() {
   
    this.isSubmitting=true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.isSubmitting=false;
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          this.article.favorited=true;
          return this.articlesService.favorite(this.article.slug)
          .pipe(tap(
            data => {
               this.article['favoritesCount']++;
               this.isSubmitting=false;
            }
          ));

        // Otherwise, unfavorite the article
        } else {
          this.article.favorited=false;
          return this.articlesService.unfavorite(this.article.slug)
          .pipe(tap(
            data => {
              this.article['favoritesCount']--;
              this.isSubmitting=false;
            }
          ));
        }
        
      }
    )).subscribe();
  }
}
