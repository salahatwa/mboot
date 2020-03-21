import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Article, User ,Comment, ArticleType } from '../../entities';
import {  UserService } from './../../../../shared/shared-services/core';
import { ArticlesService, CommentsService } from '../../services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DynamicFormComponent } from './../../../../components/ui-form-builder/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = [];
  isSubmitting = false;
  isDeleting = false;

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  form: FormGroup;

  model:any;

  formValue:any;
  

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    public deviceService: DeviceDetectorService,
    private titleService: Title
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;
       
        this.titleService.setTitle("Intializer | "+this.article.slug);

        if(this.article.type==ArticleType.APPLICATION)
          this.model=JSON.parse(this.article.body);
        console.log(data);
       
        // console.log(this.router.getCurrentNavigation().extras.state);
        let formValue=localStorage.getItem("submitedData");
        console.log(formValue);
        if(formValue&&formValue!=undefined&&formValue!=''&&formValue!='undefined')
        this.formValue=JSON.parse(formValue);

        console.log('$$$$$$$$$$$$$');
        console.log(this.article.tagList);
        // Load the comments on this article
        this.populateComments();

      }
    );

    // 
   
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        console.log(this.currentUser.profile);
        console.log(this.article.author);
       if(this.currentUser.profile)
        this.canModify = (this.currentUser.profile.username === this.article.author.username);
      }
    );
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

  isPDFDownloading =false;

  downloadPDF() {
    this.isPDFDownloading = true;

    this.articlesService.downloadArticlePDF(this.article.slug)
      .subscribe(
        data =>{
          console.log(this.article.slug);
          this.downLoadFile(data, "application/pdf",+this.article.slug+".pdf");
        },
        success => {
         // this.router.navigateByUrl('/');
         console.log('Done downloading article PDF');
        }
      );
  }

  downLoadFile(data: any, type: string,fileName:string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
 
    const element = document.createElement('a');
      element.href = url;
      element.download =fileName;
      document.body.appendChild(element);
      element.click(); 
   }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors.errors;
         
        }
      );
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(
        success => {
          this.comments = this.comments.filter((item) => item !== comment);
        }
      );
  }

}
