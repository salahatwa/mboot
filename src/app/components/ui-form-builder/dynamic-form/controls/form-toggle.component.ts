import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
@Component({
  selector: "app-toggle",
  template: `
<div class="full-width-field" [formGroup]="group" >
<mat-checkbox [formControlName]="field.name" [checked]="field.value" >{{field.label}}</mat-checkbox>
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
<mat-error *ngIf="group.get(field.name).hasError('required')">{{validation.message}}</mat-error>
</ng-container>
</div>
`,
styles:['.full-width-field {width: -webkit-fill-available !important;}']
})
export class FormToggleComponent implements Field,OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
    console.log(this.field.validations);
    console.log(this.group.get(this.field.name));
    this.field.validations.forEach(valid=>{
     
      if(this.group.get(this.field.name).hasError(valid.name)){
        console.log(this.field.validations);
      }
    });
   
  }

  
}
