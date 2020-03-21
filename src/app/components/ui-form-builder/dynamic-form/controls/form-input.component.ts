import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';

@Component({
    selector: 'form-input',
    template: `
        <mat-form-field  class="full-width-field " [formGroup]="group" >
<input matInput [formControlName]="field.name"  [placeholder]="field.label" [type]="field.inputType">
<!--
<span matPrefix>INR </span>
  <span matSuffix>.00</span>  
-->

<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
    `,
    styles:['.full-width-field {width: -webkit-fill-available !important;}']
    
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}