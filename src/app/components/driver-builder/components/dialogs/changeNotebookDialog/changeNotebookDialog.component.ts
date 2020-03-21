import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Application } from '../../../entities/application';
// import { remote } from 'electron';
import { Constants } from '../../../utils/constants';

@Component({
    selector: 'changenotebook-dialog',
    templateUrl: './changeNotebookDialog.component.html',
    styleUrls: ['./changeNotebookDialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChangeNotebookDialogComponent implements OnInit, OnDestroy {
    //private globalEmitter = remote.getGlobal('globalEmitter');

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChangeNotebookDialogComponent>) {
    }

    public notebooks: Application[];

    public ngOnDestroy(): void {
    }

    public async ngOnInit(): Promise<void> {
      //  this.globalEmitter.emit(Constants.getNotebooksEvent, this.getNotebooksCallback.bind(this));
    }

    public changeNotebook(notebook: Application) {
     //   this.globalEmitter.emit(Constants.setNotebookEvent, notebook.id, [this.data.noteId]);
        this.dialogRef.close(true); // Force return "true"
    }

    private getNotebooksCallback(notebooks: Application[]): void {
        this.notebooks = notebooks;
    }
}