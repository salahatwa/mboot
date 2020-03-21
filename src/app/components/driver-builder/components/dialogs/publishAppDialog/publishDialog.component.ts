import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { ArticlesService } from './../../../../../components/client/services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Article , ArticleType } from './../../../../../components/client/entities';

@Component({
    selector: 'publish-dialog',
    templateUrl: './publishDialog.component.html',
    styleUrls: ['./publishDialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PublishDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
    article: Article = {} as Article;
    isSubmitting:boolean;
    errors: [] ;
    form: FormGroup;

    constructor( private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PublishDialogComponent>,private articlesService: ArticlesService,
    private router: Router) {
        // dialogRef.disableClose = true;
        this.form = this.formBuilder.group({
          title: '',
          description:'',
          tagList: this.formBuilder.array([])
        });
    }

    public ngOnInit(): void {
     
       console.log(this.data);

          if(this.data.article)
          {
            this.article=this.data.article;
            this.form.patchValue(this.article);
    
            this.article.tagList.forEach(tag=>{
              this.tagsArray.push(new FormControl(tag));
            });
          }

           // Initialized tagList as empty array
      if(!this.article.tagList)
      this.article.tagList = [];
    }

    get tagsArray() {
        return this.form.get('tagList') as FormArray;
     }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    
        // Add our fruit
        if ((value || '').trim()) {
          this.article.tagList.push( value.trim());
          this.tagsArray.push(new FormControl(value.trim()));
        }
        
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
    
      remove(tag: any): void {
        const index =  this.article.tagList.indexOf(tag);
    
        if (index >= 0) {
          this.article.tagList.splice(index, 1);
          this.tagsArray.removeAt(index);
        }
      }

     
      submit(form) {
        this.isSubmitting = true;
    

        

        console.log(form.value);

        // update the model
        this.updateArticle(form.value);
    
        // post the changes
        this.articlesService.save(this.article).subscribe(
          article =>
          { 
            this.dialogRef.close(this.form.value);
            console.log(article);
              this.router.navigateByUrl('/article/' + article.slug);
        },
          err => {
            this.errors = err.errors;
            this.isSubmitting = false;
          }
        );
        // this.dialogRef.disableClose = true;
       
      }

     

      updateArticle(values: Object) {
        Object.assign(this.article, values);
        this.article.body=this.data.note.content;
        this.article.type=ArticleType.APPLICATION;
        this.article.noteId=this.data.note.id;
      }
}
