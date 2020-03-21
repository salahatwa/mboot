



import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
@Component({
  selector: "app-checkbox",
  template: `
<div class="full-width-field" [formGroup]="group">


<label>{{field.label}}</label>

<mat-selection-list [ngClass]="{'list-horizontal':field.layout === 'H'}" [formControlName]="field.name">
  <mat-list-option  [checkboxPosition]="after" *ngFor="let v of field.options" [value]="v.value">
    {{v.label}}
  </mat-list-option>
</mat-selection-list>


<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>


</div>
`,
styles:['.full-width-field {width: -webkit-fill-available !important;}','.dir-radio-group {display: flex; flex-direction: column;margin: 15px 0;}','.list-horizontal {padding: 0;.mat-list-item {display: inline-block;height: auto;width: auto;}}']
})
export class FormCheckboxComponent implements Field,OnInit {

  field: FieldConfig;
  group: FormGroup;
  constructor() {}

  ngOnInit() {
  }

  


}
