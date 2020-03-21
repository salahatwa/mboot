import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Application } from '../../entities/application';
import { Note, NoteType } from '../../entities/note';

@Component({
    selector: 'active-app-search',
    templateUrl: './activeAppAndSearch.component.html',
    styleUrls: ['./activeAppAndSearch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActiveAppAndSearchComponent implements OnInit {
    constructor(public searchService: SearchService) {
    }

    @Input()
    public activeApplication: Application;

    @Input()
    public notesCount: number;

    @Input()
    public activeNote: Note;

    @Output()
    public clickGetCurrent: EventEmitter<Note> = new EventEmitter<Note>();
    
    getCurrentSelected()
    {
     this.clickGetCurrent.emit(this.activeNote);
    }

    public ngOnInit(): void {
    }
}