import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';

@Component({
    selector: 'form-select',
    template: `
        <mat-form-field class="full-width-field" [formGroup]="group">
<mat-select [placeholder]="field.label" [formControlName]="field.name">
<mat-option *ngFor="let item of field.options" [value]="item.value">{{item.label}}</mat-option>
</mat-select>
</mat-form-field>
    `,
    styles:['.full-width-field {width: -webkit-fill-available !important;}']
})
export class FormSelectComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}