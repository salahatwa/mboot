



import { Component, OnInit ,EventEmitter,Output} from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';
import { GlobalValidator } from "../dynamic-validator";
@Component({
  selector: "form-list-object",
  template: `
<div class="full-width-field"  [formGroup]="group" >

<mat-card  style="margin-top: 8px;margin-bottom: 8px;" formArrayName="{{field.name}}">

<mat-card-header>
  <mat-card-title>{{field.label}}</mat-card-title>
</mat-card-header>

<mat-card-content>
<div class="row" *ngFor="let creds of group.get(field.name)?.controls;let i=index;" >

<mat-divider *ngIf="nestedContainer.length > 1 && i > 0" ></mat-divider><br>


<div [formGroupName]="i" [ngClass]="gridColumnClass" *ngFor="let subField of field.subFields;"> 
                    <ng-container  dynamicField  [field]="subField" [group]="nestedContainer.controls[i]" [formValues]="formValues" >
                    </ng-container>    
</div>

<div class="icon" *ngIf="nestedContainer.length > 1" (click)="removeItem(i)">
<i class="fas fa-trash"></i>
</div>


</div>
</mat-card-content>

<mat-card-actions>
<button type="button" mat-icon-button (click)="addItem()">
  <i class="fas fa-plus-square"></i>
  </button>
  <button type="button" mat-icon-button (click)="clearAllItems()">
  <i class="fas fa-trash"></i>
  </button>
</mat-card-actions>

</mat-card>

</div>




`,
styles:['.full-width-field {width: -webkit-fill-available !important;}.icon { text-align:center;margin:auto;}']
})
export class FormListObjectComponent implements Field,OnInit {

  field: FieldConfig;
  group: FormGroup;
  formValues:any;

  gridColumnClass='col-md-5';
  
 
  

  constructor(private fb: FormBuilder) {
    
  }
  
  nestedContainer:FormArray;

  ngOnInit() {
     this.nestedContainer = this.group.get(this.field.name) as FormArray;
    //console.log('NESTED FORM VALUE:: %s', JSON.stringify( (this.group.get(this.field.name) as FormArray).value) );
    if(this.field.subFields.length==1)
    this.gridColumnClass='col-md-10';
    if(this.field.subFields.length==2)
    this.gridColumnClass='col-md-5';
    if(this.field.subFields.length==3)
    this.gridColumnClass='col-md-4';
    if(this.field.subFields.length==4)
    this.gridColumnClass='col-md-3';
    if(this.field.subFields.length==5)
    this.gridColumnClass='col-md-2';
    if(this.field.subFields.length==6)
    this.gridColumnClass='col-md-1';
    
    console.log(this.formValues);
    if(this.formValues&&this.group)
        {
          console.log('-----------------');
          console.log( this.field.name);
          console.log( this.formValues);
          console.log( this.formValues[this.field.name]);
          console.log('-----------------');
          // this.group.patchValue(this.formValues);
         
        }
    // this.group.patchValue(this.formValues);

  }


  

  removeItem(i:number){
    this.nestedContainer.removeAt(i);
  }
  clearAllItems()
  {
    while(this.nestedContainer.length) {
      this.nestedContainer.removeAt(this.nestedContainer.length - 1);
    }
    this.nestedContainer.clearValidators();
  }

  addItem() {
    this.nestedContainer.push(this.createNestedControls(this.field.subFields));
  }


  createNestedControls(subFields:FieldConfig[]): FormGroup {
    const group = this.fb.group({});
        subFields.forEach((field) => {
            const { type, name , subFields} = field;
          if (type === "button") return;

          if(type === "object")
          {
            group.addControl(name, this.createNestedControl(subFields) );
          }
          else if(type === "list")
          {
            group.addControl(name, this.fb.array([ this.createListControl(subFields) ]));
          }
          else{
          group.addControl(name, this.createControl(field));
         }
        });
        return group;
  }

  createNestedControl(subFields:FieldConfig[]): FormGroup {
    const group = this.fb.group({});
    subFields.forEach((field) => {
        const { type ,subFields} = field;
      if (type === "button") return;

      if(type === "object")
      {
        group.addControl(field.name, this.createNestedControl(subFields) );
      }
      else if(type === "list")
      {
        group.addControl(field.name, this.fb.array([ this.createListControl(subFields) ]));
      }
      else{
      group.addControl(field.name, this.createControl(field));
      }

    });
    return group;
}

createListControl(subFields:FieldConfig[]): FormGroup {
  const group = this.fb.group({});
  subFields.forEach((field) => {
      const { type, name , subFields} = field;
    if (type === "button") return;

    if(type === "object")
    {
      group.addControl(name, this.createNestedControl(subFields) );
    }
    else if(type === "list")
    {
      group.addControl(name, this.fb.array([ this.createListControl(subFields) ]));
    }
    else{
    group.addControl(name, this.createControl(field));
   }
  });
  return group;
}


createControl(config: FieldConfig) {
  const { disabled, validations, value } = config;
  return this.fb.control({ disabled, value }, this.bindValidations(validations || []));
}

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(GlobalValidator.getMatchValidator(valid));
      });
      return Validators.compose(validList);
    }
    return null;
  }


}
