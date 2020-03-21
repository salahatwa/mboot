import { Component, OnInit, OnDestroy, HostListener, NgZone, ViewEncapsulation, Input ,EventEmitter, Output, ViewChild, ɵConsole} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChangeNotebookDialogComponent } from '../dialogs/changeNotebookDialog/changeNotebookDialog.component';
import { JwtService, UserService } from './../../../../shared/shared-services/core';
import { SnackBarService } from '../../services/snackBar.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogComponent } from '../../../../shared/shared-components/errorDialog/errorDialog.component';

import { Utils } from '../../utils/utils';
import { ConfirmationDialogComponent } from '../dialogs/confirmationDialog/confirmationDialog.component';
import { NoteExport } from '../../utils/noteExport';
import { SettingsService } from '../../services/settings.service';
// import { ipcRenderer } from 'electron';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TasksCount } from '../../utils/tasksCount';
import { Note, NoteType } from '../../entities/note';
import { TemplateControllerService, CTemplate } from '../../services/template-controller.service';
import { DomSanitizer } from '@angular/platform-browser';

import { AppType, Application } from '../../entities/application';
import { BuilderService } from './../../../../shared/shared-services/core/services/builder.service';
import { NoteSettingComponent } from './note-setting.component';


@Component({
    selector: 'note-content',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('actionIconRotation', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(90deg)' })),
            transition('rotated => default', animate('250ms ease-out')),
            transition('default => rotated', animate('250ms ease-in'))
        ])
    ],
})
export class NoteComponent extends NoteSettingComponent implements OnInit, OnDestroy  {


    @Input() note: Note;

    modelForm:any;




  unescapeHtml(unsafe) {
      console.log('unscape ......');
    return unsafe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        // .replace(/&quot;/g, "\"")
        // .replace(/&#039;/g, "'");
}

  onChange(event:any) {
    // this.htmlContent1=this.unescapeHtml(this.htmlContent1);
    //this.htmlContent1=this.unescapeHtml(this.htmlContent1);
    // console.log("TEXT>>>"+event.editor.getEditorText());
    // if( typeof this.note.content === "string" ) {
    //     console.log("CONTENT>>"+this.note.content);
    //   }
    //   else{
        // this.note.content=JSON.stringify(this.note.content);
    // console.log("CONTENT>ooo>"+this.note.content);
    //   }
    


  }


  onBlur(event) {
  }


    constructor(protected jwtService: JwtService, private zone: NgZone, private dialog: MatDialog,private builderService:BuilderService,
        private snackBarService: SnackBarService, private translateService: TranslateService,private userService:UserService,
        private settingsService: SettingsService,private templateControllerService:TemplateControllerService,private sanitizer: DomSanitizer) {
            super(jwtService);
    }
    
    public isMarked: boolean;
  
    public canPerformActions: boolean = false;
    public actionIconRotation: string = 'default';

    @Input() application:Application;
    @Output() backBtn = new EventEmitter<boolean>();


    templateModel:any={};

    back() :void
    {
        this.backBtn.emit();
    }


    public ngOnDestroy(): void {
    }

    appsTemplate:Application[];

    

    public  ngOnInit(){
    
        if(this.note.isTextEditor)
        this.editorConfig.defaultMode="2";
        else
        this.editorConfig.defaultMode="1";
       
       
        if(this.note.noteType==NoteType.FORM)
        {
            if(this.note.content&&this.note.content!=null&&this.note.content!='')
              this.modelForm=JSON.parse(this.note.content);
            //   else
        }


         this.builderService.getApplicationByType(this.application.collectionId,AppType.APP_TEMPLATE).subscribe(data=>{
            this.appsTemplate=data;
            console.log(this.application);
        });
    //    if(this.application&&this.application.selectedModel!=null)
    //    {
    //      await this.builderService.getNote(this.application.selectedModel).subscribe((data)=>{
            
    //           if(data.text&&data.text!=null&&data.text!='')
    //           {
    //                 //  console.log('|||||||LL:'+JSON.stringify(data.text));
    //             let model:any= data.text;
    //              if(model.attributes)
    //              {
    //                let fields:Array<FormField>=model.attributes;
    //                this.templateModel= this.buildDataSet(fields);
    //             //    console.log(JSON.stringify(fields));
    //              }

    //           }
    //         // JSON.parse(data.text)
    //        });
    //    }
    //    await this.getNoteDetailsAsync();

    // this.note.content=JSON.parse(this.note.content);
    console.log('Details:'+JSON.stringify(this.note));
      
    }

  
    public changeNotebook(): void {
        let dialogRef: MatDialogRef<ChangeNotebookDialogComponent> = this.dialog.open(ChangeNotebookDialogComponent, {
            width: '450px', data: { noteId: this.note.id }
        });
    }

 

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (this.settingsService.closeNotesWithEscape) {
           // let window: BrowserWindow = remote.getCurrentWindow();
           // window.close();
        }
    }


 
    public setEditorMode(editor:boolean): void {
        
        this.note.isTextEditor=!editor;
       
        if(this.note.isTextEditor)
        {
            this.note.isTextEditor=true;
         this.joditEditor.editor.setMode(2);
        
        }
         else
         {
            this.note.isTextEditor=false;  
            this.joditEditor.editor.setMode(1);
         }

        this.builderService.updateNotesAsync(this.note).subscribe(data=>{
            this.note=data;
           
           });
    }

    public async exportNoteToPdfAsync(): Promise<void> {
        this.hideActionButtons();

     
    }

    public printNote(): void {
        this.hideActionButtons();
     
        // if(this.note.noteType==NoteType.FILE&&!this.note.isTextEditor)
        // this.note.content=this.unescapeHtml(this.note.content);
        
        if(this.note.noteType==NoteType.FORM)
        {
            // console.log(this.modelForm);
            if(this.modelForm&&this.modelForm!=null&&this.modelForm!='')
            {
             this.modelForm.pageConfig.formId=this.note.id;
             this.modelForm.pageConfig.noteCreatorId=this.userService.getCurrentUser().profile.username;
             this.note.content=JSON.stringify(this.modelForm);
            }
        }
        console.log(this.note.content);
     
      this.builderService.updateNotesAsync(this.note).subscribe(data=>{
       this.note=data;
    //    this.noteEdited.next();
      });
      
        //   if(this.note.selectedApps)
        //   {
        //       let selectedApps=(this.note.selectedApps+'').split(",");
        //       console.log(selectedApps);
        //       selectedApps.forEach(noteID => {
        //         console.log('GET nOTE>>>:'+noteID);
        //         this.collectionService.getNote(noteID).subscribe((appTemplate=>{
        //             appTemplate.selectedApps=noteID;
        //             console.log('+++::'+appTemplate.id);
        //            // this.collectionService.setNoteTextEventHandler(appTemplate, this.getTasksCount());
        //         }));
        //     });
        //   }
     
       
    }

    async getAppsTemplate(): Promise<Application[]>
    {
        // let appsTemplate:Application[]=await this.builderService.getApplicationByType(AppType.APP_TEMPLATE);

        // return appsTemplate;
        return null;
    }

   async setFormFillTemplate(): Promise<void>
    {
        // this.hideActionButtons();

        // let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNote').toPromise();
        // let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNote', { noteTitle: this.note.title }).toPromise();

        // let appsTemplate:Application[]=await this.builderService.getApplicationByType(AppType.APP_TEMPLATE);

        // console.log(appsTemplate.length);
        // let dialogRef: MatDialogRef<SelectFormTemplateDialogComponent> = this.dialog.open(SelectFormTemplateDialogComponent, {

        //     width: '450px', data: { dialogTitle: title, dialogText: text ,apps:appsTemplate,selectedApps: this.note.selectedApps}
        // });

        // dialogRef.afterClosed().subscribe(async (result) => {
        //     if (result) {
               
        //             let selected = dialogRef.componentInstance.formApps.value;
        //             console.log(selected);

        //             try
        //             {
        //                 this.note.selectedApps=selected;
                        
        //                 await this.builderService.setNoteTextEventHandler(this.note, this.getTasksCount());

        //                 this.snackBarService.noteTitleCannotBeEmptyAsync();
        //           }catch(error)
        //           {
                
        //               this.zone.run(() => {
        //                   this.dialog.open(ErrorDialogComponent, {
        //                       width: '450px', data: { errorText: 'Error Saving App '+error }
        //                   });
        //               });
        //           }
        //        // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);

        //     //    let window: BrowserWindow = remote.getCurrentWindow();
        //       //  window.close();
        //     }
        // });
        
    }

    public async deleteNoteAsync(): Promise<void> {
        this.hideActionButtons();

        let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNote').toPromise();
        let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNote', { noteTitle: this.note.title }).toPromise();

        let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {

            width: '450px', data: { dialogTitle: title, dialogText: text }
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
               // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);

            //    let window: BrowserWindow = remote.getCurrentWindow();
              //  window.close();
            }
        });
    }

    public onFixedContentClick(): void {
        this.hideActionButtons();
    }

    public toggleShowActions(): void {
        this.canPerformActions = !this.canPerformActions;
        this.rotateActionsButton();
    }

    public rotateActionsButton(): void {
        this.actionIconRotation = this.canPerformActions ? 'rotated' : 'default';
    }

    public async exportNoteAsync(): Promise<void> {
        this.hideActionButtons();

        try {
            // console.log('>>>'+this.noteContent);
            // if (this.note.content) {
               let cTemplate=new CTemplate();
               cTemplate.templateContent=this.unescapeHtml(this.note.content);
               cTemplate.templateModel='{ "name": "Imperial Stout", "user":{"img":"https://xdsoft.net/jodit/files/cbimage.jpg"}, "country": "Tasty Stout Beer" ,"skills":[{"age":29,"name":"mkyong"}, {"age":30,"name":"fong"}]}';
               cTemplate.templateName=this.note.title;

                this.templateControllerService.validateTemplate(cTemplate);
                // .subscribe((data=>{
                //     console.log(data);
                // }));
            // }

        } catch (error) {
            console.log(`An error occurred while exporting the note with title '${this.note.title}'. Cause: ${error}`);

            let errorText: string = (await this.translateService.get('ErrorTexts.ExportNoteError', { noteTitle: this.note.title }).toPromise());

            this.dialog.open(ErrorDialogComponent, {
                width: '450px', data: { errorText: errorText }
            });
        }
    }

    // private async setNoteTitleCallbackAsync(result: NoteOperationResult): Promise<void> {
    //     if (result.operation === Operation.Blank) {
    //         // this.zone.run(() => this.note.title = this.initialNoteTitle);
    //         this.snackBarService.noteTitleCannotBeEmptyAsync();
    //     } else if (result.operation === Operation.Error) {
    //         // this.zone.run(() => this.note.title = this.initialNoteTitle);
    //         let errorText: string = (await this.translateService.get('ErrorTexts.RenameNoteError', { noteTitle: this.note.title }).toPromise());

    //         this.zone.run(() => {
    //             this.dialog.open(ErrorDialogComponent, {
    //                 width: '450px', data: { errorText: errorText }
    //             });
    //         });
    //     } else if (result.operation === Operation.Success) {
    //         this.zone.run(() => {
    //             // this.initialNoteTitle = result.noteTitle;
    //             this.note.title = result.noteTitle;
    //             // this.setWindowTitle(result.noteTitle);
    //         });
    //     } else {
    //         // Do nothing
    //     }

    // }

   


    private async getNoteDetailsAsync() {
        // Details from data store
        while (!this.note.title) {
            // While, is a workaround for auto reload. CollectionService is not ready to
            // listen to events after a auto reload. So we keep trying, until it responds.
            // await Utils.sleep(50);
            // this.note=this.builderService.getNoteDetailsEventHandler( this.note.id);
        }

        // Details from note file
        try {
        
           
        } catch (error) {
            console.error(`Could not get the content for the note with id='${this.note.id}'. Cause: ${error}`);

            let errorText: string = (await this.translateService.get('ErrorTexts.GetNoteContentError').toPromise());

            this.dialog.open(ErrorDialogComponent, {
                width: '450px', data: { errorText: errorText }
            });
        }
    }

    private hideActionButtons(): void {
        this.canPerformActions = false;
        this.rotateActionsButton();

    }

    private getTasksCount(): TasksCount {
    
       return;
    }
}

