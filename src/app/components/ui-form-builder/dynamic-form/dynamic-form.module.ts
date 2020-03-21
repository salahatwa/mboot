import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form.component';

import { FormInputComponent } from './controls/form-input.component';
import { DynamicFormFieldPlaceDirective } from './dynamic-form-field-place.directive';
import { FormSelectComponent } from './controls/form-select.component';
import { FormButtonComponent } from './controls/form-button.component';
import { FormCheckboxComponent } from './controls/form-checkbox.component';
import { FormDateComponent } from './controls/form-date.component';
import { FormListObjectComponent } from './controls/form-list-object.component';
import { FormObjectComponent } from './controls/form-object.component';
import { FormRadiobuttonComponent } from './controls/form-radiobutton.component';
import { FormToggleComponent } from './controls/form-toggle.component';
import { FormImageComponent } from './controls/form-image.component';
import { MaterialModule } from '../../../shared/shared-module/material.module';


const fieldComponents = [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormCheckboxComponent,
    FormDateComponent,
    FormListObjectComponent,
    FormObjectComponent,
    FormRadiobuttonComponent,
    FormToggleComponent,
    FormImageComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        DynamicFormFieldPlaceDirective,
        
        ...fieldComponents
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormFieldPlaceDirective,
    ],
    entryComponents: fieldComponents
})
export class DynamicFormModule {}