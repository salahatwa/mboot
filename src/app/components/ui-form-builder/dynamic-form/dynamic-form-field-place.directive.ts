import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dynamic-form-placeId]'
})
export class DynamicFormFieldPlaceDirective {
    @Input('dynamic-form-placeId') placeId: string;

    constructor(public vcRef: ViewContainerRef) {
       
    }
}
