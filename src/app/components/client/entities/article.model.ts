import { Profile } from '../../../shared/shared-services/models/profile.model';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  type: ArticleType;
  noteId:number;
}

export const enum ArticleType {
  NORMAL='0',
  APPLICATION='1'
}
