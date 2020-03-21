import { Component, OnInit, Input, OnDestroy, NgZone, Output, EventEmitter, ViewEncapsulation, ElementRef } from '@angular/core';
import { Note, NoteType } from '../../entities/note';
import { Subscription, Subject, fromEvent, Observable } from 'rxjs';
import { SnackBarService } from '../../services/snackBar.service';
import { Application } from '../../entities/application';
import { Constants } from '../../utils/constants';
import { SearchService } from '../../services/search.service';
import { NoteMarkResult } from '../../services/results/noteMarkResult';
import { debounceTime, takeUntil } from 'rxjs/internal/operators';
import { Utils } from '../../utils/utils';
import { SettingsService } from '../../services/settings.service';
import { FileService } from '../../services/file.service';
import { SelectionWatcher } from '../../utils/selectionWatcher';
import { Overlay } from '@angular/cdk/overlay';
import { SpinnerService } from '../../../../shared/shared-components/spinner/spinner.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmationDialog/confirmationDialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BuilderService } from './../../../../shared/shared-services/core/services/builder.service';
import { PublishDialogComponent } from '../dialogs/publishAppDialog/publishDialog.component';
import { ArticlesService } from './../../../../components/client/services';
import { Article } from './../../../../components/client/entities';
import { EditNoteDialogComponent } from '../dialogs/editNoteDialog/edit-note-dialog.component';
import { EditFolderDialogComponent } from '../dialogs/editFolderDialog/edit-folder-dialog.component';

@Component({
    selector: 'notes-component',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit, OnDestroy {
    
    private readonly destroy$ = new Subject();
    private _activeApplication: Application;
    private _activeParentNote: Note;
    
    private selectionWatcher: SelectionWatcher = new SelectionWatcher();
    public isNoteOpen:boolean=true;
    public isFolderOpen:boolean=true;

    private subscription: Subscription;
    private noteEdited = new Subject();
    public noteEdited$: Observable<{}> = this.noteEdited.asObservable();
    
    public selectedNote: Note;

    constructor(private builderService: BuilderService, private snackBarService: SnackBarService,
        public searchService: SearchService, private dialog: MatDialog, private settingsService: SettingsService,
        private translateService: TranslateService, private zone: NgZone,
        private service: SpinnerService, private overlay: Overlay, private elRef: ElementRef,
        private articlesService: ArticlesService) {
    }


    public get activeApplication(): Application {
        return this._activeApplication;
    }

    

    @Input()
    public set activeApplication(val: Application) {
        this._activeApplication = val;
        this.getNotes(this._activeApplication,  null);
        this.isNoteOpen=true;       
    }

    public eventsSubscription:any;
    @Input()
    events:Observable<Note>;

    @Input()
    public set activeSelectedNote(val: Note) {
        this._activeParentNote=val;
    }

    public get activeSelectedNote(): Note {
        return this._activeParentNote;
    }
    

    @Output()
    public notesCount: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public activeNote: EventEmitter<Note> = new EventEmitter<Note>();


    public notes: Note[] = [];
    public canShowList: boolean = true;

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.eventsSubscription.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }

    public async ngOnInit(): Promise<void> {
        // Workaround for auto reload
        // await this.collectionService.initializeAsync();
      
        this.subscription = this.builderService.noteEdited$.subscribe(() =>  this.getNotes(this.activeApplication, this._activeParentNote));
        this.subscription = this.builderService.noteDeleted$.subscribe(() =>  this.getNotes(this.activeApplication, this._activeParentNote));
        this.subscription.add(this.builderService.noteApplicationChanged$.subscribe(
            () =>  this.getNotes(this.activeApplication, this._activeParentNote)));
        this.subscription.add(this.searchService.searchTextChanged$.subscribe(
            (_) =>  this.getNotes(this.activeApplication, this._activeParentNote)));

        this.subscription.add(this.builderService.noteMarkChanged$.subscribe((result: NoteMarkResult) => {
                this.getNotes(this.activeApplication,  this._activeParentNote);
        }));
       
        this.eventsSubscription=this.events.subscribe((note)=>{
           
            if(note)
            {
                console.log('Listen:' + note.title);
                const perviousNoteId: number = note.parentNote;
               if(perviousNoteId)
               {
                this.builderService.getNote(perviousNoteId).subscribe(backNote=>{
                    this.getNotes(this.activeApplication,  backNote);
                    this.activeNote.emit( backNote);
                });
                
               }
               else{
                this.getNotes(this.activeApplication,  null);
               }
               this.isNoteOpen=true;

            }
        });
    }


    public openNote(selectedNote: Note): void {

        const progressRef = this.service.showProgress(this.elRef);

             this.selectedNote = selectedNote;
             this.activeNote.emit( this.selectedNote);
            
       switch(selectedNote.noteType)
       {
        case NoteType.FOLDER:
                this.getNotes(this._activeApplication,this.selectedNote);
                 this.isFolderOpen==!this.isFolderOpen;
                
               break;
        case NoteType.FORM:
        case NoteType.FILE:
                this.isNoteOpen=!this.isNoteOpen;
               this.builderService.hideNoteBtn();
         
               break;
       }


       this.service.detach(progressRef);
      
       
    }

    public onBack()
    {
      this.isNoteOpen=!this.isNoteOpen;

    


        if(this._activeParentNote)
            {
                const perviousNoteId: number = this._activeParentNote.parentNote;
               if(perviousNoteId)
               {
                this.builderService.getNote(perviousNoteId).subscribe(backNote=>{
                    this.getNotes(this.activeApplication,  backNote);
                    this.activeNote.emit( backNote);
                });
                
               }
               else{
                this.getNotes(this.activeApplication,  null);
               }
               this.isNoteOpen=true;

            }
    //   this.activeNote.emit( this._activeParentNote);
    //   this.builderService.hideNoteBtn();
    //  }
    }

    public toggleNoteMark(note: Note): void {
        // this.collectionService.setNoteMark(note.id, !note.isMarked);
    }

    private async refreshVirtuallScrollerAsync(): Promise<void> {
        // cdk-virtual-scroll-viewport doesn't resize its viewport automatically,
        // so we need to use a retarded workaround.
        this.canShowList = false;
        await Utils.sleep(50);
        this.canShowList = true;
    }

    private markNote(result: NoteMarkResult): void {
        if (this.notes.length > 0) {
            let noteToMark: Note = this.notes.find(x => x.id === result.noteId);

            if (noteToMark) {
                noteToMark.isMarked = result.isMarked;
            }
        }
    }

    private getNotes(activeApplication:Application,activeParentNote:Note): void {

        if (activeApplication) {
           
            this.zone.run(async () => {
                const progressRef = this.service.showProgress(this.elRef);

                 this.builderService.
                getNotesAsync(this.activeApplication.id,activeParentNote).subscribe((data)=>
                {
                    this.notes=data;
                    this.notes = this.builderService.getFilteredNotes(this.notes, this.searchService.searchText);
                    this.selectionWatcher.reset(this.notes);
                    this.notesCount.emit(this.notes.length);
    
                    this.activeNote.emit(activeParentNote);
                    this.noteEdited.next();
                    this.service.detach(progressRef);
                }

                );
                 
            });
        }
    }

    public async deleteNote(note:Note): Promise<void> {

        let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNote').toPromise();
        let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNote', { noteTitle: note.title }).toPromise();

        let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {

            width: '450px', data: { dialogTitle: title, dialogText: text }
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
               // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);
await this.builderService.deleteNotesAsync(note);
            //    let window: BrowserWindow = remote.getCurrentWindow();
              //  window.close();
            }
        });
    }


    public async editFolder(note:Note): Promise<void> {
        let dialogRef: MatDialogRef<EditFolderDialogComponent> = this.dialog.open(EditFolderDialogComponent, {

            width: '450px', data: { dialogTitle: 'Edit', note: note  }
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
               // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);
            //  await this.builderService.deleteNotesAsync(note);
            //    let window: BrowserWindow = remote.getCurrentWindow();
              //  window.close();
            }
        });
    }


    public async editNote(note:Note): Promise<void> {
        let dialogRef: MatDialogRef<EditNoteDialogComponent> = this.dialog.open(EditNoteDialogComponent, {

            width: '450px', data: { dialogTitle: 'Edit', note: note  }
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
               // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);
            //  await this.builderService.deleteNotesAsync(note);
            //    let window: BrowserWindow = remote.getCurrentWindow();
              //  window.close();
            }
        });
    }

    public async publish(note:Note): Promise<void> {

        let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteNote').toPromise();
        let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteNote', { noteTitle: note.title }).toPromise();

        let art:Article;
        if(note.articleId)
        {
          art= await  this.articlesService.getById(note.articleId).toPromise();
        }

        let dialogRef: MatDialogRef<PublishDialogComponent> = this.dialog.open(PublishDialogComponent, {

            width: '450px', data: { dialogTitle: 'Publish ', note: note ,article:art }
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result) {
               // this.globalEmitter.emit(Constants.deleteNoteEvent, this.note.id);
            //  await this.builderService.deleteNotesAsync(note);
            //    let window: BrowserWindow = remote.getCurrentWindow();
              //  window.close();
            }
        });
    }
}
