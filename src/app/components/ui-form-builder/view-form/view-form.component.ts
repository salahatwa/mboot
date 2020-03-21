import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldLayout, ActionBuilder } from '../dynamic-form/models/field-config.interface';
import { Operation } from '../operation';
import { ApiService } from './../../../shared/shared-services/core';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
  form: FormGroup;

  @Input() model:any;

  @Input() data:any;

  @Input() slug:string;

  constructor(private apiService: ApiService,public fb: FormBuilder) { }

  ngOnInit() {
     /*############ Registration Form ############*/
  // this.form = this.fb.group({
  //   model: this.fb.array([])
  // })
  this.model.content[0].isCompleted=true;

 
  }



  layout:FieldLayout=
    {
    rows:[
      {
        cols:[
          {
            placeId:'email',
            colClass:'col-md-4',
           },
          {
            placeId:'name',
            colClass:'col-md-4',
           },
           {
             placeId:'password',
             colClass:'col-md-4',
            }
           
        ]
      }
      ,
      {
        cols:[
          {
            placeId:'dob',
            colClass:'col-md-6',
           },
           {
             placeId:'age',
             colClass:'col-md-6',
            }
        ]
      } ,
      {
        cols:[
          {
            placeId:'gender',
            colClass:'col-md-4',
           },
           {
             placeId:'userinfo',
             colClass:'col-md-8',
            }
        ]
      } 
      ,
      {
        cols:[
          {
            placeId:'favorite',
            colClass:'col-md-4',
           },
           {
             placeId:'credentials',
             colClass:'col-md-8',
            }
        ]
      }
      
    ]
  } 

  activedStep = 0;

  prevStep(step) {
    this.activedStep = step - 1;
  }

   userData:any={};

  nextStep(index,dynamicForm:any) {
    
    this.model.content[index].isCompleted=true;
    this.activedStep = index + 1;
    this.model.content[this.activedStep].isCompleted=true;

    if(dynamicForm.valid)
    {
      console.log(dynamicForm.value);
      this.userData= Object.assign(this.userData, dynamicForm.value);
    }
   
    console.log(dynamicForm);
  }


  isLinear=true;

  isCompleted =false;


  
  submit(value: {[name: string]: any}) {
    this.userData= Object.assign(this.userData, value);

    console.log(this.userData);
    var activeButton = document.activeElement.getAttribute("Name");;

      console.log('Clicked Button:'+activeButton);
      // console.log(value);
      let action;
      console.log(this.model);
      this.model.content.forEach(content=>{
        content.attributes.forEach(field=>{

          if(field.type==='button'&&field.name==activeButton)
          {
           
            action=field.action;
            action.formId=this.model.pageConfig.formId;

            if(this.slug)
            action.slug=this.slug;
            
            console.log('Submitted app:'+field.action);
          

            if (!action) {
              console.log("appId is null "+action);
              return ;
            }
  
            this.excute(action,this.userData);
          }

        });

       
    });



  }

  private excute(action:ActionBuilder,value:any)
  {
    try {
      console.log(value);
      let operation: Operation = new Operation(action,value);

      console.log(action);
      this.apiService.postGetFile('/operation/submit',operation).subscribe((data)=>{
        console.log(`Added Application '${action}' to the data store`);

        if(action.actionType=='0')
        this.downLoadFile(data, "application/zip",'Test');
        else if(action.actionType=='1')
        this.downLoadFile(data, "application/pdf","test.pdf");
      
      });
    } catch (error) {
      console.log(`Could not add notebook  Cause: ${error}`);
    
    }
  }


  downLoadFile(data: any, type: string,fileName:string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
 
    const element = document.createElement('a');
      element.href = url;
      element.download =fileName
      document.body.appendChild(element);
      element.click(); 
   }

}
