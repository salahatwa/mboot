import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ArticleListConfig, Article } from '../entities';
import { ApiService } from './../../../shared/shared-services/core';

@Injectable()
export class ArticlesService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/articles' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .pipe(map(data => data));
  }

  getById(id): Observable<Article> {
    return this.apiService.get('/articles/find/' + id)
      .pipe(map(data => data));
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  downloadArticlePDF(slug) {
    return  this.apiService.postGetFile('/articles/' + slug + '/pdf',{});
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug,  article);

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', article);
    }
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }


}
