import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../../../../shared/shared-components/errorDialog/errorDialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from '../../../utils/enums';
import { SnackBarService } from '../../../services/snackBar.service';
import { FormControl } from '@angular/forms';
import { Application, AppType } from '../../../entities/application';
import { Note } from '../../../entities/note';
import { BuilderService } from './../../../../../shared/shared-services/core/services/builder.service';

export interface FormApp {
    // id: string;
    name: string;
    existingApps: ExistingFormApp[];
  }
  
  export interface ExistingFormApp {
    // disabled?: boolean;
    id: string;
    name: string;
    
  }

@Component({
    selector: 'rename-notebook-dialog',
    templateUrl: './renameNotebookDialog.component.html',
    styleUrls: ['./renameNotebookDialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RenameNotebookDialogComponent implements OnInit {
    constructor(private builderService: BuilderService, private dialogRef: MatDialogRef<RenameNotebookDialogComponent>,
        private translateService: TranslateService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
        private snackBarService: SnackBarService) {
        dialogRef.disableClose = true;
       
    }

    public notebookId: string = this.data.notebookId;
    public notebookName: string = this.data.notebookName;
    public notebookType:string = this.data.notebookType;

    formApps = new FormControl();

    
    formsApp:FormApp[]=[
        {name:'UserForms',existingApps:[{id:'37',name:'SampleForm'}]} ,
        {name:'sample',existingApps:[{id:'3',name:'EXAMPLE FORM'}]}
    ];
 
    selectedModel:string=this.data.selectedModel;

    public ngOnInit(): void {
        //this.notebookName = this.collectionService.getNotebookName(this.data.notebookId);
        this.formApps.setValue(this.selectedModel);

        this.getFormApps();
        
        console.log(this.data.selectedModel+'************'+this.notebookId +"++++++"+ this.notebookName);
    }

    async getFormApps()
    {
        //  this.formsApp=await this.collectionService.getNotebooksByType(AppType.APP_FORM);
        //  this.formsApp.forEach(function(part, index, app) {
            
        //     console.log('|||||||||||ddd|'+app[index].id);
        //     //  if(app.selectedModel)
        //     this.loadAppForm(app[index].id,app);
             
        //  });
    }

//    async loadAppForm(id:string,formsApp:Notebook)
//     {
//       let notes:Note[]=await  this.collectionService.getNotesAsync(id,null,false);
//       formsApp.notes=notes;

//     }
    public async updateNotebookAsync(): Promise<void> {
        // let selected = this.formApps.value;
        // console.log("><><><::"+selected);
        
        let operation: Operation = await this.builderService.updateApplication(this.notebookId, this.notebookName,this.formApps.value);

        if (operation === Operation.Error) {
            let errorText: string = (await this.translateService.get('ErrorTexts.RenameNotebookError', { notebookName: this.notebookName }).toPromise());

            this.dialog.open(ErrorDialogComponent, {
                width: '450px', data: { errorText: errorText }
            });
        } else if (operation === Operation.Duplicate) {
            this.snackBarService.duplicateNotebookAsync(this.notebookName);
        }
    }

    // public async renameNotebookAndCloseAsync(): Promise<void> {
    //     await this.updateNotebookAsync();
    //     this.dialogRef.close();
    // }
}
