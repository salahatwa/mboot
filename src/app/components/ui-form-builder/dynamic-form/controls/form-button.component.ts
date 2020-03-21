import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../models/field.interface';
import { FieldConfig } from '../models/field-config.interface';

@Component({
    selector: 'form-button',
    template: `
        <div class="demo-full-width margin-top" [formGroup]="group">
<button type="submit" name="{{field.name}}" mat-raised-button color="primary" [disabled]="!group.valid">{{field.label}}</button>

<!--  -->
</div>
    `,
    styles:['.full-width-field {width: -webkit-fill-available !important;}']
})
export class FormButtonComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}