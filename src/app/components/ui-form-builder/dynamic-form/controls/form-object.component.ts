


import {
  Component, ContentChildren, OnInit, QueryList, Input
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { DynamicFormFieldPlaceDirective } from '../dynamic-form-field-place.directive';
@Component({
  selector: 'form-object',
  template: `
<div class="full-width-field" [ngClass]="gridColumnClass" [formGroup]="group">



<mat-card style="margin-top: 8px;margin-bottom: 8px;">
<mat-card-header>
  <mat-card-title>{{field.label}}</mat-card-title>
</mat-card-header>

<mat-card-content>
 <div [ngClass]="gridColumnClass" [formGroupName]="field.name" *ngFor="let subField of field.subFields;" > 
                    <ng-container   dynamicField  [field]="subField" [group]="group.get(field.name)" [formValues]="formValues">
                    </ng-container>    
 </div>
</mat-card-content>

<!--
                    <ng-container [formGroupName]="field.name" 
                    *ngFor="let subField of field.subFields;" 
                    dynamicField
                    [field]="subField" 
                    [group]="group.get(field.name)" >
                    
                    </ng-container>
-->





</mat-card>

</div>



`,
styles:['.full-width-field {width: -webkit-fill-available !important;}']
})
export class FormObjectComponent implements Field,OnInit {

  field: FieldConfig;
  group: FormGroup;
  formValues:any;

  gridColumnClass='col-md-5';

  constructor() {
    
  }

  ngOnInit() {
    if(this.field.subFields.length==1)
    this.gridColumnClass='col-md-12';
    if(this.field.subFields.length==2)
    this.gridColumnClass='col-md-12';
    if(this.field.subFields.length==3)
    this.gridColumnClass='col-md-4';
    if(this.field.subFields.length==4)
    this.gridColumnClass='col-md-3';
    if(this.field.subFields.length==5)
    this.gridColumnClass='col-md-2';
    if(this.field.subFields.length==6)
    this.gridColumnClass='col-md-1';

    if(this.formValues&&this.group)
    {
      console.log(this.formValues);
      // this.group.patchValue(this.formValues);
    }
  }

  ngAfterContentInit() {
    
 }


  

}
