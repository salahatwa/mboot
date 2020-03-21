import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { BuilderService } from '../../../../../shared/shared-services/core/services/builder.service';

@Component({
  selector: 'app-edit-folder-dialog',
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.scss']
})
export class EditFolderDialogComponent implements OnInit {
  form: FormGroup;
  isSubmitting:boolean;

  constructor( private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditFolderDialogComponent>,
    private router: Router,private builderService:BuilderService) {
        // dialogRef.disableClose = true;
        this.form = this.formBuilder.group({
          title:'',
          // extension:'',
          alias: '',
          isFlyFolder:'',
          flySeperator: ''
        });
    }
  ngOnInit() {
    this.form.patchValue(this.data.note);
  }


  submit(form) {
    this.isSubmitting = true;


    

    console.log(form.value);

    // update the model

    Object.assign(this.data.note, form.value);

    console.log('After update:');
    console.log(this.data.note);
    // post the changes
    this.builderService.updateNotesAsync(this.data.note).subscribe(
      note =>
      { 
        this.dialogRef.close(this.form.value);
        console.log(note);
        
    },
      err => {
        // this.errors = err.errors;
        this.isSubmitting = false;
      }
    );
    // this.dialogRef.disableClose = true;
   
  }

}
