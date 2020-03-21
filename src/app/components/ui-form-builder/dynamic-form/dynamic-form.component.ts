import {
    Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit,
    Output, QueryList, ɵConsole
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { FieldConfig, FieldLayout } from './models/field-config.interface';
import { DynamicFormFieldPlaceDirective } from './dynamic-form-field-place.directive';
import { GlobalValidator } from './dynamic-validator';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    template: `
        <form fxLayout="column"
                class="dynamic-form"
                [formGroup]="form"
                (submit)="handleSubmit($event)">
            <ng-content></ng-content>
            <ng-container
                    *ngFor="let field of fields;"
                    dynamicField 
                    [container]="containers[field.name]"
                    [field]="field"
                    [group]="form"
                    [formValues]="data">
            </ng-container>

            

        </form>
    `,
})
export class DynamicFormComponent implements OnChanges, OnInit {
    @Input()
    fields: FieldConfig[] = [];


    @Output()
    submit: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    data:any;// set values if exist

    get controls() { return this.fields.filter(({type}) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() {
        return this.form.value; 
    }

    @ContentChildren(DynamicFormFieldPlaceDirective) places: QueryList<DynamicFormFieldPlaceDirective>;

    containers = {};

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.createGroup();

        console.log(this.form.value);

        if(this.data&&this.form)
        {
         this.form.patchValue(this.data);
        //  this.form.setValue(this.data);
         this.form.updateValueAndValidity();
        //  if(this.data[this.field.name])
        //  this.formValues[this.field.name].forEach((x) => {
        //    this.nestedContainer.push(this.fb.group(x))
        //  });
           this.fields.forEach(field=>{
                 if(this.data[field.name]&&field.type=='list')
                 {
                     console.log(field);
                     console.log(this.data[field.name]);
                    let arr = this.form.get(field.name) as FormArray;

                    if(this.data[field.name]&&arr&&Array.isArray(this.data[field.name]))
                    {

                        console.log(arr);
                        console.log(this.data[field.name]);
                        try{
                        arr.push(this.createListControl(field.subFields));
                        this.form.patchValue(this.data);
                        }catch(ex){
                            console.log(ex);
                        }
                    
                    }
                }
           });



           
        }
    }

    ngOnChanges() {
        // console.log('ON CHANGE');
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const config = this.fields.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });
        }
    }

    ngAfterContentInit() {
        this.places.forEach(x => {
            // console.log(x);
            this.containers[x.placeId] = x.vcRef;
        });
    }

    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => {
            const { type, name , subFields} = control;
            console.log(name+':'+type);
            if(type === "object")
             {
                group.addControl(name,  this.createNestedControl(subFields) );
                // console.log('DONE CREATED [%s] CONTROL  [%s]  , >>[%s]', name,type,value);
            }
            else if(type === "list")
            {
              group.addControl(name, this.fb.array([ this.createListControl(subFields) ]));
            }
            group.addControl(name, this.createControl(control));
        });
        return group;
    }

    
    createControl(config: FieldConfig) {
        const { disabled, validations, value ,name } = config;
        return this.fb.control({ disabled, value }, this.bindValidations(validations || []));
    }

    createNestedControl(subFields:FieldConfig[]): FormGroup {
        const group = this.fb.group({});
        subFields.forEach((field) => {
            const { name,type ,subFields} = field;
            console.log(name+':'+type);

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

    createListControl(subFields:FieldConfig[]): FormGroup {
        const group = this.fb.group({});
        subFields.forEach((field) => {
            const { type, name , subFields} = field;

            console.log(name+':'+type);

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

    

    handleSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    }

    setDisabled(name: string, disable: boolean) {
        if (this.form.controls[name]) {
            const method = disable ? 'disable': 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.fields = this.fields.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, {emitEvent: true});
    }
}