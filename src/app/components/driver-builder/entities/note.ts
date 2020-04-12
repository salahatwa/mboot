import * as moment from 'moment';

export class Note{
    constructor(public title: string, public applicationId: string) {
    }

    public id: string ;
    public isMarked: boolean = false;
    public creationDate: number = moment().valueOf();
    public modificationDate: number = moment().valueOf();
    public content: string = "";
    public noteType:NoteType=NoteType.FILE;
    public parentNote:string;
    public extension:string;
    public displayModificationDate: string;
    public displayExactModificationDate: string;
    public isSelected: boolean;
    public closedTasksCount: number = 0;
    public totalTasksCount: number = 0;
    public selectedApps:string;// array of apps ids splitted by comma
    public isTextEditor:boolean;
    
    //File preoperties
    public isRepeatable:boolean;
    public iterateKey:string;

    //Folder Properties
    public isFlyFolder:boolean;
	public flySeperator:string;


    public alias:string;
    public articleId:string;
}

export enum NoteType {
    FILE='0',
    FOLDER='1',
    FORM='3'
}


