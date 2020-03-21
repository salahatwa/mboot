import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Application } from '../../../entities/application';

@Component({
  selector: 'app-select-form-template-dialog',
  templateUrl: './select-form-template-dialog.component.html',
  styleUrls: ['./select-form-template-dialog.component.scss']
})
export class SelectFormTemplateDialogComponent implements OnInit {

   formApps = new FormControl();

   appsTemplate:Application[]=this.data.apps;

   selectedApps:string[]=this.data.selectedApps;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SelectFormTemplateDialogComponent>) {
    dialogRef.disableClose = true;
}

  ngOnInit() {
    this.formApps.setValue(this.selectedApps);
  }

}
