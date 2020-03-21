import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { FormInputComponent } from './controls/form-input.component';


import { Field } from './models/field.interface';
import { FieldConfig } from './models/field-config.interface';
import { FormSelectComponent } from './controls/form-select.component';
import { FormButtonComponent } from './controls/form-button.component';
import { FormCheckboxComponent } from './controls/form-checkbox.component';
import { FormDateComponent } from './controls/form-date.component';
import { FormListObjectComponent } from './controls/form-list-object.component';
import { FormObjectComponent } from './controls/form-object.component';
import { FormRadiobuttonComponent } from './controls/form-radiobutton.component';
import { FormToggleComponent } from './controls/form-toggle.component';
import { FormImageComponent } from './controls/form-image.component';

const components: {[type: string]: Type<Field>} = {
    input: FormInputComponent,
    select: FormSelectComponent,
    button: FormButtonComponent,
    checkbox: FormCheckboxComponent,
    date: FormDateComponent,
    list: FormListObjectComponent,
    object: FormObjectComponent,
    radio: FormRadiobuttonComponent,
    toggle: FormToggleComponent,
    image:FormImageComponent
};

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
    @Input()
    field: FieldConfig;

    @Input()
    group: FormGroup;

    @Input()
    formValues:any;

    component: ComponentRef<Field>;

    @Input() container: ViewContainerRef;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver
    ) {}

    ngOnChanges() {
        if (this.component) {
            this.component.instance.field = this.field;
            this.component.instance.group = this.group;
            this.component.instance.formValues = this.formValues;
        }
    }

    ngOnInit() {
        if (!components[this.field.type]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`
            );
        }

        const container = this.container || this.vcRef;
        Promise.resolve(null).then(() => {
            const component = this.resolver.resolveComponentFactory<Field>(components[this.field.type]);
            this.component = container.createComponent(component);
            this.component.instance.field = this.field;
            this.component.instance.group = this.group;
            this.component.instance.formValues = this.formValues;
        })
    }
}