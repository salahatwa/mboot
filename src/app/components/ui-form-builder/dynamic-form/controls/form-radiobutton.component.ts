import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
@Component({
  selector: "app-radiobutton",
  template: `
<div class="full-width-field" [formGroup]="group">
<label class="radio-label-padding">{{field.label}}:</label>
<mat-radio-group  [ngClass]="{'dir-radio-group':field.layout === 'V'}" [formControlName]="field.name">
<mat-radio-button *ngFor="let item of field.options" [value]="item.value">{{item.label}}</mat-radio-button>
</mat-radio-group>
</div>
`,
styles:['.full-width-field {width: -webkit-fill-available !important;}','.dir-radio-group {display: flex; flex-direction: column;margin: 15px 0;}']
})
export class FormRadiobuttonComponent implements Field,OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
