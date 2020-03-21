import {CommonModule} from "@angular/common";
import {Popover} from "./popover.directive";
import {PopoverContent} from "./popovercontent.component";
import {NgModule} from "@angular/core";

export * from "./popover.directive";
export * from "./popovercontent.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverContent,
        Popover,
    ],
    exports: [
        PopoverContent,
        Popover,
    ],
    entryComponents: [
        PopoverContent
    ]
})
export class PopoverModule {

}