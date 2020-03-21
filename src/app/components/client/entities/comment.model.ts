import { Profile } from '../../../shared/shared-services/models/profile.model';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
