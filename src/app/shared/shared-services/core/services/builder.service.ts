import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Collection } from '../../../../components/driver-builder/entities/collection';
import { Page } from './../../../../shared/shared-components/paging-lib/page';
import { Observable, Subject } from 'rxjs';
import { Pageable } from './../../../../shared/shared-components/paging-lib/pageable';
import { Operation } from './../../../../components/driver-builder/utils/enums';
import { AppType, Application } from '../../../../components/driver-builder/entities/application';
import { HttpParams } from '@angular/common/http';
import { NoteType, Note } from '../../../../components/driver-builder/entities/note';
import { TranslateService } from '@ngx-translate/core';
import { NoteOperationResult } from './../../../../components/driver-builder/services/results/noteOperationResult';
import { NotesCountResult } from './../../../../components/driver-builder/services/results/notesCountResult';
import { NoteMarkResult } from './../../../../components/driver-builder/services/results/noteMarkResult';
import { SearchService } from './../../../../components/driver-builder/services/search.service';
import { NoteDateFormatResult } from './../../../../components/driver-builder/services/results/noteDateFormatResult';
import { Utils } from './../../../../components/driver-builder/utils/utils';
import moment, { Moment, Duration } from 'moment';
import { NotExpr } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  private collectionsChanged = new Subject();
  public collectionsChanged$: Observable<{}> = this.collectionsChanged.asObservable();

  private applicationEdited = new Subject();
  public applicationEdited$: Observable<{}> = this.applicationEdited.asObservable();

  private applicationDeleted = new Subject();
  public applicationDeleted$: Observable<{}> = this.applicationDeleted.asObservable();

  private noteBtnDis= new Subject();
  public noteBtnDis$: Observable<{}> = this.noteBtnDis.asObservable();


  private noteEdited = new Subject();
  public noteEdited$: Observable<{}> = this.noteEdited.asObservable();
 
  private noteDeleted = new Subject();
  public noteDeleted$: Observable<{}> = this.noteDeleted.asObservable();

  private noteMarkChanged = new Subject<NoteMarkResult>();
  public noteMarkChanged$: Observable<NoteMarkResult> = this.noteMarkChanged.asObservable();
  
  private noteApplicationChanged = new Subject();
  public noteApplicationChanged$: Observable<{}> = this.noteApplicationChanged.asObservable();

  constructor(private apiService: ApiService,private translateService: TranslateService,private searchService: SearchService) { }


  public getAllCollections(pageable: Pageable): Observable< Page<Collection>>
  {
    return this.apiService.getPage('/builder/collection',pageable);
  }

  public getCollection(name: string): Observable<Collection>
  {
    return this.apiService.get('/builder/collection/find?collectionName='+name);
  }


  public async  addCollectionAsync(collection: Collection): Promise<Operation> {
    // Check if a collection was provided
    if (!collection) {
      console.log("collection is null");
      return Operation.Error;
    }

    try {

       this.apiService.post('/builder/collection',collection)
      .subscribe(data=>{
         console.log(`Added collection '${collection.name}'`);
         this.collectionsChanged.next();  
      });

      return Operation.Success;
      
    } catch (error) {
      console.log(`Could not add collection '${collection.name}'. Cause: ${error}`);

      return Operation.Error;
    }
  }


  public async deleteCollectionAsync(collection: Collection): Promise<Operation> {
        try {
      
    
          this.apiService.delete('/builder/collection/'+collection.id).subscribe(data=>{
            this.collectionsChanged.next();
          });
         
        } catch (error) {
          console.log(`Could not delete the collection '${collection.name}'. Cause: ${error}`);
        }
    
        return Operation.Success;
      }
  



  public  getApplicationByType(collectionId,appType:AppType):Observable<Application[]> {  

    console.log(appType);
          let params = new HttpParams();
          params = params.set('collectionId',collectionId);
          params = params.set('appType', appType);

       return   this.apiService
            .get('/builder/application',params);
      
  }

  public async addApplication(collectionId:number,appName: string,appType :AppType)  :   Promise<Application>  {
      
      // // Check if a appName name was provided
      // if (!appName || !appType) {
      //   console.log("appName is null appType is"+appType);
      //   return Operation.Error;
      // }
  
        // Check if there is already a notebook with that name
        // if (this.isApplicationExist(notebookName)) {
        //   console.log(`Not adding notebook '${notebookName}' to the data store because it already exists`);
        //   return Operation.Duplicate;
        // }
  
        // Add the notebook to the data store
        let applicaion: Application = new Application(appName,collectionId,appType);
         return this.apiService.post('/builder/application',applicaion).toPromise().then((data)=>{
          applicaion=data;
          applicaion.isSelected=true;
          console.log(`Added Application '${appName}' to the data store`+JSON.stringify(applicaion));
          // applicaion=data;
           this.applicationEdited.next(applicaion);
           return applicaion; 
         
        });
       
        // console.log(`Added Application '${appName}' to the data store`+JSON.stringify(applicaion));
        
   }


   public async deleteApplication(applicationId:string): Promise<Operation> {
    let operation: Operation = Operation.Success;

      try {
        this.apiService.delete('/builder/application/'+applicationId).subscribe(data=>{
          this.applicationDeleted.next();
        });
      } catch (error) {
        console.log(`Could not delete the notebook with id='${applicationId}'. Cause: ${error}`);
        operation = Operation.Error;
      }
    
    return operation;
  }


  public async updateApplication(applicationId: string, newApplicationName: string,selectedForm:string): Promise<Operation> {
    // Check if a application name was provided
    if (!newApplicationName) {
      console.log("Application Name is null");
      return Operation.Error;
    }

    try {
      // Check if there is already a application with that name
      // if (this.isApplicationExist(newApplicationName)) {
      //   return Operation.Duplicate;
      // }

      
      // Get the application
      this.apiService.get('/builder/application/'+applicationId).subscribe((data)=>
      {
        let application: Application= data;
        
        // if (application.name === newApplicationName) {
        //   // No rename required
        //   return Operation.Aborted;
        // }
         // Rename the application
         application.name = newApplicationName;
         application.selectedModel=selectedForm;
         application.isSelected=true;

         this.apiService.put('/builder/application/',application).subscribe((data)=>{
           console.log(data);
         });

         this.applicationEdited.next();
        
      });
     
    } catch (error) {
      console.log(`Could not rename the notebook with id='${applicationId}' to '${newApplicationName}'. Cause: ${error}`);
      return Operation.Error;
    }

    return Operation.Success;
  }

  public getNote(noteId: number): Observable<Note> { 
    return this.apiService.get('/builder/note/'+noteId);
   }
 


  public  getNotesAsync(appId: number, parentNote :Note): Observable<Note[]> {

      if (appId) {
       


        // if(parentNote&&parentNote.noteType == NoteType.FOLDER) {
          let parentNoteId:number=0;
          if(parentNote)
           parentNoteId=parentNote.id;

      return   this.apiService.get('/builder/note/'+appId+'/'+parentNoteId);
 
      
    
      // this.notesCountChanged.next(notesCountResult);
      // console.log('||1111111111111111111|');
      // return notesForNoteBook;
      // console.log('||1111111111111111111sssssssss|');
      // Fill in the display date & notes array
      // for (let note of notesForNoteBook) {
      //     notes.push(note);
        

        // let result: NoteDateFormatResult = await this.getNoteDateFormatAsync(note.modificationDate, useExactDates);

      

        // // Date text
        // note.displayModificationDate = result.dateText;
        // note.displayExactModificationDate = this.getFormattedDate(note.modificationDate);
      // }

      
      
     
     }
   
  
  }

  public getFilteredNotes(unfilteredNotes: Note[], filter: string): Note[] {
    // When there is no filter, return the original collection.
    if (!filter || filter.trim().length === 0) {
      return unfilteredNotes;
    }

    let searchTextPieces: string[] = filter.trim().split(" ");

    return unfilteredNotes.filter((x) => Utils.containsAll(`${x.title} ${x.content}`, searchTextPieces));
  }


  private async getNoteDateFormatAsync(millisecondsSinceEpoch: number, useExactDates: boolean): Promise<NoteDateFormatResult> {
    let result: NoteDateFormatResult = new NoteDateFormatResult();
    let nowDateonly: Moment = moment().startOf('day');
    let modificationDateOnly: Moment = moment(millisecondsSinceEpoch).startOf('day');
    let duration: Duration = moment.duration(nowDateonly.diff(modificationDateOnly));

    if (duration.asMonths() >= 12) {
      result.dateText = await this.translateService.get('NoteDates.LongAgo').toPromise();
    } else if (duration.asMonths() >= 11) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 11 }).toPromise();
    } else if (duration.asMonths() >= 10) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 10 }).toPromise();
    } else if (duration.asMonths() >= 9) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 9 }).toPromise();
    } else if (duration.asMonths() >= 8) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 8 }).toPromise();
    } else if (duration.asMonths() >= 7) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 7 }).toPromise();
    } else if (duration.asMonths() >= 6) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 6 }).toPromise();
    } else if (duration.asMonths() >= 5) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 5 }).toPromise();
    } else if (duration.asMonths() >= 4) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 4 }).toPromise();
    } else if (duration.asMonths() >= 3) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 3 }).toPromise();
    } else if (duration.asMonths() >= 2) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 2 }).toPromise();
    } else if (duration.asMonths() >= 1) {
      result.dateText = await this.translateService.get('NoteDates.MonthsAgo', { count: 1 }).toPromise();
    } else if (duration.asDays() >= 21) {
      result.dateText = await this.translateService.get('NoteDates.WeeksAgo', { count: 3 }).toPromise();
    } else if (duration.asDays() >= 14) {
      result.dateText = await this.translateService.get('NoteDates.WeeksAgo', { count: 2 }).toPromise();
    } else if (duration.asDays() >= 8) {
      result.dateText = await this.translateService.get('NoteDates.LastWeek').toPromise();
    } else if (duration.asDays() >= 7) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 7 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 6) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 6 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 5) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 5 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 4) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 4 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 3) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 3 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 2) {
      result.dateText = await this.translateService.get('NoteDates.DaysAgo', { count: 2 }).toPromise();
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 1) {
      result.dateText = await this.translateService.get('NoteDates.Yesterday').toPromise();
      result.isYesterdayNote = true;
      result.isThisWeekNote = true;
    } else if (duration.asDays() >= 0) {
      result.dateText = await this.translateService.get('NoteDates.Today').toPromise();
      result.isTodayNote = true;
      result.isThisWeekNote = true;
    }

    if (useExactDates) {
      result.dateText = this.getFormattedDate(millisecondsSinceEpoch);
    }

    return result;
  }

  private getFormattedDate(millisecondsSinceEpoch: number) {
    let m: Moment = moment(millisecondsSinceEpoch);
    return m.format("MMMM D, YYYY");
  }

  public async addNote(noteType: NoteType, applicationId: number,parentNote:Note): Promise<NoteOperationResult> {
    let baseTitle: string;
    switch(noteType)
    {
   case NoteType.FILE:
      baseTitle = await this.translateService.get('Notes.NewFile').toPromise();
     break;
   case NoteType.FOLDER:
      baseTitle = await this.translateService.get('Notes.NewFolder').toPromise();
      break;
   case NoteType.FORM:
      baseTitle = await this.translateService.get('Notes.NewForm').toPromise();
     break;
    }

    let result: NoteOperationResult = new NoteOperationResult(Operation.Success);

    // If a default notebook was selected, make sure the note is added as unfiled.
    if (!applicationId) {
      applicationId = null;
    }

    try {

      //Set Parent Note
      
      let newNote: Note = new Note(baseTitle, applicationId);
      newNote.noteType=noteType;
      newNote.extension="txt";
      if(parentNote)
      newNote.parentNote=parentNote.id;
      else
      newNote.parentNote=null;

      this.apiService.post('/builder/note',newNote).subscribe((data)=>{
        this.noteEdited.next();
      });
     
    
    } catch (error) {
      console.log(`Could not add note . Cause: ${error}`);
      result.operation = Operation.Error;
    }

    return result;
  }


public noteButtonAction()
{

}

  public async deleteNotesAsync(note: Note): Promise<Operation> {
    let operation: Operation = Operation.Success;

    
      try {
        // 1. Delete note from data store
        this.apiService.delete('/builder/note/'+note.id).subscribe(data=>{
          this.noteDeleted.next();
        });
     console.log('Done deleted');
      } catch (error) {
        console.log(`Could not delete the note with id='${note.id}'. Cause: ${error}`);
        operation = Operation.Error;
      }

    return operation;
  }


    public  updateNotesAsync(note:Note) : Observable<Note> {



      // if(typeof note.content !="string")
      //    note.content=JSON.stringify(note.content);
       

      // console.log('@@@@###---'+JSON.stringify(note));

    return this.apiService.post('/builder/note',note);
      // .subscribe((data)=>{
      // console.log(`Set text of note with id=${data.id}.`);
      // console.log(JSON.stringify(note)+'}}}}'+JSON.stringify(data));
      // this.noteEdited.next();
      // return data;
     
  }

  public hideNoteBtn()
  {
    this.noteBtnDis.next();
  }

  public downloadZip(app:Application)
  {
    // let params: HttpParams = new HttpParams();
    // params.set("responseType","2");
    this.apiService.getFile('/builder/application/downloadZip/'+app.id).subscribe(response => this.downLoadFile(response, "application/zip",app.name));
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
