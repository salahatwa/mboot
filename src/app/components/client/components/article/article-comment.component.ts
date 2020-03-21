import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Comment } from '../../entities';
import { UserService,User } from './../../../../shared/shared-services/core';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService
  ) {}

  private subscription: Subscription;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        console.log('Comment..');
        console.log(userData);
        console.log( this.comment);
        this.canModify = (userData.profile.username === this.comment.author.username);
        console.log('CAN MODIFY:'+this.canModify);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
