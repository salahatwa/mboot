import { Component, Input } from '@angular/core';
import { Article } from '../../entities';


@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styles:['.user-pic {height: 26px;border-radius: 50px;margin-right: 5px;}']
})
export class ArticleMetaComponent {
  @Input() article: Article;
}
