import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
@Component({
  selector: "app-toggle",
  template: `
<div class="full-width-field" [formGroup]="group" >

<!-- Select File [formControlName]="field.name"
    <input  class="form-group"  type="file" accept="image/*" (change)="showPreview($event)" />
    

    <div class="imagePreview" *ngIf="this.field.value && this.field.value !== ''">
      <img [src]="this.field.value" [alt]="field.name">
    </div>
    -->

    <div class="form-group">
  
    <div class="input-group">
        <span class="input-group-btn">
            <span class="btn btn-default btn-file" >
            {{field.label}} <input type="file"  class="imgInp" accept="image/*" (change)="showPreview($event)">
            </span>
        </span>
        <input type="text" [value]="fileName" class="form-control" readonly>
    </div>
    <div class="imagePreview" *ngIf="this.field.value && this.field.value !== ''">
      <img class='img-upload' [src]="this.field.value" [alt]="field.name">
    </div>
    </div>


    <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
    <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
</div>
`,
styles:['.full-width-field {width: -webkit-fill-available !important;}.btn-file { position: relative; overflow: hidden; } .btn-file input[type=file] { position: absolute; top: 0; right: 0; min-width: 100%; min-height: 100%; font-size: 100px; text-align: right; filter: alpha(opacity=0); opacity: 0; outline: none; background: white; cursor: inherit; display: block; } .img-upload{ width: 100%; }']
})
export class FormImageComponent implements Field,OnInit,OnDestroy  {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
    this.field.value='';
    console.log(this.field.validations);
    console.log(this.group.get(this.field.name));
    this.field.validations.forEach(valid=>{
     
      if(this.group.get(this.field.name).hasError(valid.name)){
        console.log(this.field.validations);
      }
    });
   
  }

  ngOnDestroy() {
    console.log('destroy called');
    this.field.value='';
    this.group.controls[this.field.name].setValue(null);
    this.group.get(this.field.name).updateValueAndValidity();
  }

  previewUrl:string;
   fileName:string ='';
  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileName= event.target.files[0].name;

    // File Preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl=reader.result as string;
      this.field.value= e.target.result as string;

      this.group.patchValue({
        [this.field.name]: (e.target.result as string)
      });
      // this.group.controls[this.field.name].setValue(this.field.value);
     
    }
    reader.readAsDataURL(file);
   
  }

  
}
