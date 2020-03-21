import { Component, OnInit, OnDestroy, NgZone, ViewEncapsulation, ɵConsole, Input ,HostListener,ViewChild} from '@angular/core';
import { Application, AppType } from '../../entities/application';
import { MatDialog, MatDialogRef, MatTabChangeEvent, MatSidenav } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { InputDialogComponent } from '../dialogs/inputDialog/inputDialog.component';
import { ErrorDialogComponent } from '../../../../shared/shared-components/errorDialog/errorDialog.component';
import { SnackBarService } from '../../services/snackBar.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../dialogs/confirmationDialog/confirmationDialog.component';
import { RenameNotebookDialogComponent } from '../dialogs/renameNotebookDialog/renameNotebookDialog.component';
import { Operation } from '../../utils/enums';
import { NoteOperationResult } from '../../services/results/noteOperationResult';
import { Note, NoteType } from '../../entities/note';
import { trigger, style, animate, state, transition } from '@angular/animations';
import { debounceTime } from "rxjs/internal/operators";
import { FileService } from '../../services/file.service';
import { SelectionWatcher } from '../../utils/selectionWatcher';
import { Router, ActivatedRoute } from '@angular/router';
import { BuilderService } from './../../../../shared/shared-services/core/services/builder.service';
import { Collection } from '../../entities/collection';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'collection-page',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('noteButtonsVisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('hidden', style({
        opacity: 0
      })),
      transition('hidden => visible', animate('.25s')),
      transition('visible => hidden', animate('.05s'))
    ])
  ]
})
export class CollectionComponent implements OnInit, OnDestroy {



  private subscription: Subscription;
  private selectionWatcher: SelectionWatcher = new SelectionWatcher();
  


  constructor(private builderService:BuilderService,private route:ActivatedRoute,private dialog: MatDialog, private fileService: FileService,
    private translateService: TranslateService, private snackBarService: SnackBarService, private zone: NgZone) {

  }

  
  public notebooksCount: number = 0;
  public applications: Application[];
  public activeApplication: Application;
  public noteButtonsVisibility: string = 'visible';
  public activeNote: Note;
  public notesCount: number = 0;
  public canDeleteNotes: boolean = false;
  public showNoteButtonSubject: Subject<any> = new Subject();
  public isBusy: boolean = false;
  public selectedCollection:Collection;

  public eventsSubject:Subject<Note>=new Subject<Note>();


 

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 pnPageChanges($event) {
    console.log('page changed - current index: ', $event);
  }


  public async ngOnInit(): Promise<void> {

    this.subscription = this.builderService.noteBtnDis$.subscribe(() =>  {
      this.hideNoteButtons();});
    
    // Workaround for auto reload
    // await this.collectionService.initializeAsync();

    this.route.params.subscribe(params => {
     let collectionName = params['name'];
      if (collectionName !== undefined && collectionName != null) {
            this.builderService.getCollection(collectionName).subscribe(data=>
              {
                this.selectedCollection=data;
                this.getApplicationByType(this.selectedCollection.id,AppType.APP_ALL);
              });
      }

  });

 // Subscriptions
 this.subscription = this.builderService.applicationEdited$.subscribe(async (app:Application) =>{ 
   await this.getApplicationByType(this.selectedCollection.id,AppType.APP_ALL,app);
  //  this.setSelectedApplication(app);
});
 this.subscription = this.builderService.applicationDeleted$.subscribe(async () => await this.getApplicationByType(this.selectedCollection.id,AppType.APP_ALL));

  

    this.showNoteButtonSubject
      .pipe(debounceTime(700))
      .subscribe((_) => {
        this.showNoteButtons();
      });
  }

  

  public setSelectedApplication(application: Application) {
   

    application.isSelected=true;

     this.selectionWatcher.toggleItemSelection(application);

  
      // No modifier key is pressed: select only 1 item
      this.selectionWatcher.selectSingleItem(application);
    

    if (this.selectionWatcher.selectedItemsCount > 0) {
      // If no notebook is selected, keep the current notebook active.
      this.activeApplication = this.selectionWatcher.selectedItems[0];
    }

  }

  public async  addApplicationAsync(){

    let titleText: string = await this.translateService.get('DialogTitles.AddNotebook').toPromise();
    let placeholderText: string = await this.translateService.get('Input.NotebookName').toPromise();

    let dialogRef: MatDialogRef<InputDialogComponent> = this.dialog.open(InputDialogComponent, {
      width: '450px', data: { titleText: titleText, placeholderText: placeholderText }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        let notebookName: string = dialogRef.componentInstance.inputText;
        let appType: AppType = dialogRef.componentInstance.appType;

        
      let app:Application=await  this.builderService.addApplication(this.selectedCollection.id,notebookName,appType);
      // this.selectionWatcher.selectItemsRange(app);
      // this.applications.push(app);
      // this.selectionWatcher.reset(this.applications, false);
      // this.setSelectedApplication(app);
        // app.isSelected=true;
        
        // switch (app) {
        //   case Operation.Duplicate: {
        //     this.snackBarService.duplicateNotebookAsync(notebookName);
        //     break;
        //   }
        //   case Operation.Error: {
        //     let errorText: string = (await this.translateService.get('ErrorTexts.AddNotebookError', { notebookName: notebookName }).toPromise());
        //     this.dialog.open(ErrorDialogComponent, {
        //       width: '450px', data: { errorText: errorText }
        //     });
        //     break;
        //   }
        //   default: {
        //     // Other cases don't need handling
        //     break;
        //   }
        // }
      }
    });
  }

  public renameApplication(application:Application): void {
    
    let dialogRef: MatDialogRef<RenameNotebookDialogComponent> = this.dialog.open(RenameNotebookDialogComponent, {
      width: '450px', data: { notebookId: application.id , notebookName:application.name ,selectedModel: application.selectedModel,notebookType:application.appType}
    });

    
  }

  public async deleteApplication(application:Application): Promise<void> {
    // Assume multiple selected notebooks
    let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNotebooks').toPromise();
    let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNotebooks').toPromise();

 
    
    let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {

      width: '450px', data: { dialogTitle: title, dialogText: text }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        let operation: Operation = await this.builderService.deleteApplication(application.id+'');

        if (operation === Operation.Error) {
          let errorText: string = (await this.translateService.get('ErrorTexts.DeleteNotebooksError').toPromise());
          this.dialog.open(ErrorDialogComponent, {
            width: '450px', data: { errorText: errorText }
          });
        }
      }
    });
  }

  public onNotesCountChanged(notesCount: number): void {
    this.notesCount = notesCount;
  }

  public async addNoteAsync(event:any,type): Promise<void> {
    
    event.target.disabled = true;

    let noteType:NoteType=type;
  
    // Create a new note
    let result: NoteOperationResult =await this.builderService.addNote(noteType, this.activeApplication.id,this.activeNote);

    if (result.operation === Operation.Success) {
     // this.globalEmitter.emit(Constants.setNoteOpenEvent, result.noteId, true);
     event.target.disabled = false;
    }
  }

  public async deleteNotesAsync(): Promise<void> {
    // Assume multiple selected notes
    let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNotes').toPromise();
    let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNotes').toPromise();

    

    if (this.activeNote) {
     
      title = await this.translateService.get('DialogTitles.ConfirmDeleteNote').toPromise();
      text = await this.translateService.get('DialogTexts.ConfirmDeleteNote', { noteTitle: this.activeNote.title }).toPromise();
    }

    let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {

      width: '450px', data: { dialogTitle: title, dialogText: text }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // Delete the notes
        let operation: Operation = await this.builderService.deleteNotesAsync(this.activeNote);

        if (operation === Operation.Error) {
          let errorText: string = (await this.translateService.get('ErrorTexts.DeleteNotesError').toPromise());
          this.dialog.open(ErrorDialogComponent, {
            width: '450px', data: { errorText: errorText }
          });
        }
      }
    });
  }

  public onSelectedNote(activeNote: Note): void {
    this.activeNote= activeNote ;
    

 if(activeNote)
 {
    if((activeNote.noteType==NoteType.FILE||activeNote.noteType==NoteType.FORM)&&activeNote.parentNote==null)
    {
      //activeNote.noteType==NoteType.FORM
      console.log('11HIDE>>>');
      this.hideNoteButtons();
    }
    else{
      console.log('44SHOW>>>');
      this.showNoteButtons();
      // this.isNoteOpen=!this.isNoteOpen;
    }
  }else{
    console.log('55SHOW>>>');
    this.showNoteButtons();
    // this.isNoteOpen=false;
  }
    

    
  }

  
  zipApplication(app:Application){
    this.builderService.downloadZip(app);
  }

  public async importNotesAsync(): Promise<void> {
    // let selectedFiles: string[] = remote.dialog.showOpenDialog({
      //filters: [
       // { name: Constants.applicationName, extensions: [Constants.noteExportExtension.replace(".", "")] },
       // { name: await this.translateService.get('DialogTexts.AllFiles').toPromise(), extensions: ['*'] }
     // ],
      // properties: ['openFile', 'multiSelections']
    // });

   // if (selectedFiles) {
     // await this.importNoteFilesAsync(selectedFiles, this.activeNotebook);
    // }
  }

  public onSelectedTabChange(event: MatTabChangeEvent): void {
    this.hideNoteButtons();
    let tabIndex: number = event.index;
    this.showNoteButtonSubject.next("");
  }

  private hideNoteButtons(): void {
    this.noteButtonsVisibility = "hidden";
  }

  private showNoteButtons(): void {
    this.noteButtonsVisibility = "visible";
  }



  private findById(list, id) {
    var index = list.map(function(element) {
      return element.id
    }).indexOf(id)
    return index;
  }

  private  getApplicationByType(collectionId:number,appType:AppType,app?:Application){
      this.builderService.getApplicationByType(collectionId,appType).subscribe(data=>{
        this.applications=data;
        if(app)
        {
          this.selectionWatcher.reset(this.applications, false,this.findById(this.applications,app.id));
          // console.log('INDEX::'+this.findById(this.applications,app.id));
          // this.selectionWatcher.selectedItems[this.findById(this.applications,app.id)].isSelected=true;
          // this.selectionWatcher.selectItemsRange(this.findById(this.applications,app.id));
          this.activeApplication = app;
        }
        else{
        this.selectionWatcher.reset(this.applications, true);
        // Set 1st Application active by default
         this.activeApplication = this.selectionWatcher.selectedItems[0];
        }
        
       this.notebooksCount = this.applications.length;
    });
    
  }


  
  
  clickOnCurrentSelected(currentSelected:Note): void
  {
    if(currentSelected)
    {
      console.log('Clicked on:'+currentSelected.title);
      this.activeNote=currentSelected;
      this.eventsSubject.next(currentSelected);
    }
  }

  private async importNoteFilesAsync(filePaths: string[], notebook: Application): Promise<void> {
    // let noteFilePaths: string[] = this.fileService.getNoteFilePaths(filePaths);

    // if (noteFilePaths.length === 0) {
    //   await this.snackBarService.noNoteFilesToImportAsync();
    //   return;
    // }

    // let importOperation: Operation = await this.collectionService.importNoteFilesAsync(noteFilePaths, notebook.id+'');

    // if (importOperation === Operation.Success) {
    //   await this.snackBarService.notesImportedIntoNotebookAsync(notebook.name);
    // } else if (importOperation === Operation.Error) {
    //   let errorText: string = (await this.translateService.get('ErrorTexts.ImportNotesError').toPromise());

    //   this.dialog.open(ErrorDialogComponent, {
    //     width: '450px', data: { errorText: errorText }
    //   });
    // }
  }
}
