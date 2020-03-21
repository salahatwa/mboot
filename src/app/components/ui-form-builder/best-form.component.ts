import { Component, ViewChild,OnInit ,EventEmitter, Output, Input,Provider,forwardRef, NgZone, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges, HostListener, Optional, ChangeDetectionStrategy, Pipe, PipeTransform, ChangeDetectorRef} from '@angular/core';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig, FieldLayout, Validator, OptionValue, ActionBuilder } from './dynamic-form/models/field-config.interface';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Application } from '../driver-builder/entities/application';
import { Operation, ActionType } from './operation';
import { ApiService, UserService } from './../../shared/shared-services/core';
import { EnumKeysPipe } from './enum_pipe';
import { BuilderService } from './../../shared/shared-services/core/services/builder.service';
import { PageStep, PageContent } from './entities/page-step';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BestFormComponent),
  multi: true
};

const noop = () => {
};






@Component({
  selector: 'app-best-form',
  templateUrl: './best-form.component.html',
  styleUrls: ['./best-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class BestFormComponent implements OnInit,ControlValueAccessor {

  isLeftVisible = true;
  isFormView:boolean=false;



  @Input() appsTemplate:Application[];




  toolbarItems: FieldConfig[] =[
    {
      type: "list",
      label: "List Objects",
      name: "List Objects",
      dragIcon: "far fa-list-alt",
      subFields:[]
    }
    ,
    {
      type: "object",
      label: "Entity",
      dragIcon: "fas fa-project-diagram",
      subFields:[
      ]
    }
    ,

    {
      type: "input",
      label: "Input",
      inputType: "text",
      dragIcon: "fas fa-pencil-alt",
      validations: [],
      value:''
    },
    {
              type: 'select',
              label: 'DropDown',
              dragIcon: "fas fa-caret-square-down",
               options:  [
                {
                  "label": "Example1",
                  "value": "option-1"
                },
                {
                  "label": "Example2",
                  "value": "option-2"
                }
              ],
              placeholder: 'Select an option',
            validations: [],
            value:''
          },
    {
      type: "radio",
      label: "Radio",
      dragIcon: "fas fa-bullseye",
      layout:'V',
      options:  [
        {
          "label": "Option-1",
          "value": "option-1"
        },
        {
          "label": "Option-2",
          "value": "option-2"
        }
      ],
      validations: [],
      value: ''
    },
    {
      type: "date",
      label: "Date",
      dragIcon: "fas fa-calendar-day",
      validations: [],
      // value:''
    },
   
    {
      type: "checkbox",
      label: "Checkbox",
      dragIcon: "far fa-check-square",
      layout:'H',
      value: [],
      options: [{
        "label": "Option 1",
        "value": "option-1"
      },
      {
        "label": "Option 2",
        "value": "option-2"
      }],
      validations: []
    },
    {
      type: "toggle",
      label: "Toggle",
      dragIcon: "fas fa-toggle-on",
      value: true,
      validations: []
    },
    {
      type: "image",
      label: "Image",
      dragIcon: "far fa-image",
      value: null,
      validations: []
    }
    ,
    {
      type: "button",
      label: "Button",
      // appId:,
      dragIcon:'fas fa-burn',
      subtype: 'submit',
      action:{
      }
    }
  ];

  inputTypes=['text','number','email','password'];
  validationTypes=['required','requiredTrue','pattern'];
  actions = [{'name':'ZIP','value':'0'},
  {'name':'DOCUMENT','value':'1'},
  {'name':'HTML','value':'2'}
  ];



  modelFields:Array<FieldConfig>=[];
  // model:any = {
  //   attributes:this.modelFields
  // };

 


  pages: PageStep = {
    pageConfig:{
      type:'H'
    },
    content:[
    {
      title: 'Step title',
      subtitle: 'Step discription',
      isCompleted:false,
      theme:{
        bgColor:"ffffff",
        textColor:"555555",
        bannerImage:""
      },
      attributes:this.modelFields
    }
  ]
}


  addPageStep() {

    let modelFields:Array<FieldConfig>=[];


    let page:PageContent={
      title: 'Step title',
      subtitle: 'Step discription',
      isCompleted:false,
      theme:{
        bgColor:"ffffff",
        textColor:"555555",
        bannerImage:""
      },
      attributes:modelFields
    }
    this.pages.content.push(page);
  }

deletePageStep(step:any) {

  const message = `Do you want to remove page `+step.title;

    const dialogData = new ConfirmDialogModel("Delete", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
     console.log(dialogResult);
      if (dialogResult) {
        const index: number = this.pages.content.indexOf(step);
        if (index !== -1) {
            this.pages.content.splice(index, 1);
        } 
      }
      
    });


  
}


constructor(public fb: FormBuilder,public dialog: MatDialog,private apiService: ApiService,private builderService:BuilderService){
      // this.actions=ActionType;
      
  }
  ngOnInit(): void {
    this.onChangeCallback(this.pages);

    console.log(this.pages);
  }

  moveItem(itemIndex:number,toItemIndex:number)
  {
     this.swap(this.pages.content,itemIndex,toItemIndex);
  }

  
   swap(input:any, index_A:any, index_B:any) {
    let temp = input[index_A];
 
    input[index_A] = input[index_B];
    input[index_B] = temp;
   }

  onDragStart(event:DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
  onDragCanceled(event:DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
      // event.data.action=new ActionBuilder();
      console.log(event.data);
      console.log(list);
    }
  }

  appNotes=[];
  loadTemplate(actionType:string,appId:number)
  {
      //  console.log(actionType+"-------"+appId);
        if(actionType=='1')
        {
          this.builderService.
                getNotesAsync(appId,null).subscribe((data)=>
                {
                  this.appNotes=data;
                });
        }
  }


 


  

  selectedModel:FieldConfig;
  setSelectedModel(selectedModel:any){
    this.selectedModel=selectedModel;
   }

   /**
    * 
    * @param i Remove field from List Model
    */
   removeField(i,fields:[]){
    const message = `Do you want to remove this field?`;

    const dialogData = new ConfirmDialogModel("Delete", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
     console.log(dialogResult);
      if (dialogResult) {
          fields.splice(i,1);
      }
      
    });

  }


  /**
   * Option values Add-Remove for select,radio,checkbox
   */
  optionValue:OptionValue={
    label:"",
    value:""
  };

  addValue(values){
    values.push(this.optionValue);
    this.optionValue={label:'',value:''};
  }

  /**
   * Validators Add-Remove
   */
  validatorOptions:Validator={
    name:'',
    message:'',
    pattern:'',
  }


  addValidations(values){
    console.log(this.validatorOptions);
    values.push(this.validatorOptions);
    this.validatorOptions={name:'',message:'',pattern:''};
  }


  //get accessor
  get value(): any {
    return this.pages;
};

//set accessor including call the onchange callback
set value(v: any) {
  // console.log('>>>?>>1>'+v);
  this.onChangeCallback(v);
}


//Placeholders for the callbacks which are later providesd
//by the Control Value Accessor
private onTouchedCallback: () => void = noop;
private onChangeCallback: (_: any) => void = noop;

writeValue(v: any): void {
// this.model=JSON.parse(v);
if(v&&v!=null&&v!='')
this.pages=v;
 this.value = this.pages ;
}

registerOnChange(fn: any): void {
this.onChangeCallback = fn;
}

registerOnTouched(fn: () => {}): void {
this.onTouchedCallback = fn;
}

 
}
