import {
    Component,
    Input,
    Provider,
    forwardRef,
    OnDestroy,
    AfterViewInit,
    ViewEncapsulation,
    ElementRef,
    EventEmitter,
    NgZone
} from '@angular/core';


declare const require: any;
const EditorModule: any = require("jodit");


import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Events, validEvents} from "./Events";

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JoditAngularComponent),
    multi: true
};

@Component({
    selector: 'jodit-editor',
    template: `<ng-template></ng-template>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./jodit-angular.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class JoditAngularComponent extends Events implements  AfterViewInit, OnDestroy, ControlValueAccessor {

    @Input() config: any | undefined = {};
    @Input() tagName: string = 'textarea';
    @Input() id: string | undefined;
    @Input() defaultValue: string | undefined;
    @Input() templateModel:any;

    element: HTMLElement;
    editor: any;

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: () => {};

    constructor(private elementRef: ElementRef, private ngZone: NgZone) {
        super();
        this.elementRef = elementRef;
        this.ngZone = ngZone;
    }

    createElement() {
        const tagName = typeof this.tagName === 'string' ? this.tagName : 'textarea';
        this.element = document.createElement(tagName);
        if (this.element) {
            this.element.id = this.id;
            this.elementRef.nativeElement.appendChild(this.element);
        }
    }


   addElement(url:string) {
        this.editor.selection.insertImage(url);
    }


    get value(): string {
        if (this.editor) {
            return this.editor.getEditorValue();
        } else {
            return '';
        }
    }

    set value(v: string) {
        if (this.editor) {
            this.editor.setEditorValue(v || '');
        } else {
            this.defaultValue = v;
        }
    }

    ngAfterViewInit() {
        if (!this.element) {
            this.createElement();

           // let templateModel={ name: "Imperial Stout", user:{"img":"https://xdsoft.net/jodit/files/cbimage.jpg"}, "country": "Tasty Stout Beer" ,"skills":[{"age":29,"name":"mkyong"}, {"age":30,"name":"fong"}]};

        //   this.config.extraButtons= ["source"];
            // this.config.extraButtons= [{
            //     name: 'OnlyParagraph',
            //     icon: '<span style="text-align: center;font-size:14px;">Ω</span>',
            //     mode    : 1 | 2 | 3,
            //     tooltip:"EXTERA",
            //     list    : this.templateModel,
            //     // exec: (editor) => {
            //     //   var selection = editor.selection;
            //     //   var text = editor.selection.getHTML();
            //     //   console.log(text);
            //     //   var html = '<p>' + text + '</p>'
            //     //   editor.selection.remove();
            //     //   editor.selection.insertHTML(html);
            //     // }
            //     exec    : function(this:any, editor: any) {
            //         var key = this.args[0],
            //         value = this.args[1];
            //         // if (key === 'clear') {
            //         //     this.val('');
            //         //     return;
            //         // }
            //         editor.selection.insertHTML('${'+key+'}');
            //     },
            //     // template: function(key: string, value: string){
            //     //     return '<div>' + value + '</div>';
            //     // }
            //   }]

            //   this.config.buttons=[{
            //     name: 'enty',
            //     icon: 'source',
            //     mode:3
            //     // exec: function () {
            //     //     let dialog = new EditorModule.Jodit.modules.Dialog(this.element),
            //     //         // div = document.createElement('div'),
            //     //         text = document.createElement('textarea');
            //     //     // div.innerText = this.value();
            //     //     dialog.setTitle('Source code');
            //     //     // dialog.setContent('dd');
            //     //     dialog.setSize(400, 300);
            //     //     // $(text)
            //     //     //     .css({
            //     //     //         width: '100%',
            //     //     //         height: '100%'
            //     //     //     })
            //     //     //     .val(div.innerHTML.replace(/<br>/g, '\n'));
            //     //     dialog.open();
            //     // }
            // }];

            // if(this.flag)
            
            // Create instance outside Angular scope
            this.ngZone.runOutsideAngular(() => {
                this.editor = new EditorModule.Jodit(this.element, this.config);
                if(this.editor.getMode()==1)
                {
                 console.log('Current Editor Mode:'+this.editor.getMode());
                }

            });
        }

        if (this.defaultValue) {
            this.editor.value = this.defaultValue;
        }

        this.editor.events
            .on('change', (value: string) => {
                if (typeof this.onChangeCallback === 'function') {
                    this.ngZone.run(() => this.onChangeCallback(value));
                }
            })
            .on('blur', () => {
                if (typeof this.onTouchedCallback === 'function') {
                    this.ngZone.run(() => this.onTouchedCallback());
                }
            });
            // .on('beforeSetValueToEditor', (old_value) => {
            //     console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
            //     if (old_value) {
            //         return old_value.replace('/&gt;/g',  '>').replace('/&lt;/g',  '<');
            //     }
            // })
            // .on('beforeGetValueFromEditor', () => {
            //     console.log('4444444444444444444444444444444444444444444444444444');
            //     return this.editor.getNativeEditorValue().replace(/\<\/[^\}]+\>/g, function (match) {
            //         return match
            //                        .replace(/&gt;/g,  '>')
            //                        .replace(/&lt;/g,  '<');
            //      });
            // //     // return this.editor.getNativeEditorValue().replace('/&gt;/g',  '>').replace('/&lt;/g',  '<');
            // });
            // .on('afterSetMode', () =>{
            //     console.log(this.editor.options);
            // });


        validEvents.forEach((eventName) => {
            const eventEmitter: EventEmitter<any> = this[eventName];
            if (eventEmitter.observers.length > 0) {
                let eventNameInJodit = eventName.substring(2);
                eventNameInJodit = eventNameInJodit.substr(0, 1).toLowerCase() + eventNameInJodit.substring(1);
                this.editor.events.on(eventNameInJodit, this.ngZone.run(() => (...args: any[]) => eventEmitter.emit({args, editor: this.editor})));
            }
        });
    }

  

    ngOnDestroy() {
        if (this.editor) {
            this.editor.destruct();
        }
    }

    writeValue(v: any): void {
        this.value = v;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: () => {}): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.editor.setReadOnly(isDisabled);
    }
}
