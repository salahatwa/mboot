import { Injectable } from '@angular/core';
// import * as Store from 'electron-store';
import { Constants } from '../utils/constants';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
  //  private settings: Store = new Store();
  
    constructor() {
    }

    // Default language
    public get defaultLanguage() : string {
        return 'en';
    }

    // language
    public get language() : string {
        return localStorage.getItem('language');
    }

    public set language(v : string) {
        localStorage.setItem('language', v);
    }

    // theme
    public get theme() : string {
        return localStorage.getItem('theme');
    }

    public set theme(v : string) {
        localStorage.setItem('theme', v);
    }

    // closeNotesWithEscape
    public get closeNotesWithEscape() : boolean {
        return JSON.parse( localStorage.getItem('closeNotesWithEscape'));
    }

    public set closeNotesWithEscape(v : boolean) {
        localStorage.setItem('closeNotesWithEscape', v+"");
    }

    // fontSizeInNotes
    public get fontSizeInNotes() : number {
        return JSON.parse( localStorage.getItem('fontSizeInNotes') );
    }

    public set fontSizeInNotes(v : number) {
        localStorage.setItem('fontSizeInNotes', v+"");
    }

    // showExactDatesInTheNotesList
    public get showExactDatesInTheNotesList() : boolean {
        return JSON.parse(localStorage.getItem('showExactDatesInTheNotesList'));
    }

    public set showExactDatesInTheNotesList(v : boolean) {
        localStorage.setItem('showExactDatesInTheNotesList', v+"");
    }

    // activeCollection
    public get activeCollection() : string {
        return localStorage.getItem('activeCollection');
    }

    public set activeCollection(v : string) {
        localStorage.setItem('activeCollection', v);
    }

    public initialize(): void {
        // storageDirectory and activeCollection cannot be initialized here.
        // Their value is set later, depending on user action.

        if (!localStorage.getItem('language')) {
            localStorage.setItem('language', 'en');
        }

        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', "default-blue-theme");
        } else {
            let settingsThemeName: string = localStorage.getItem('theme');

            // Check if the theme which is saved in the settings still exists 
            // in the app (The themes might change between releases).
            // If not, reset the theme setting to the default theme.
            if (!Constants.themes.map(x => x.name).includes(settingsThemeName)) {
                localStorage.setItem('theme', "default-blue-theme");
            }
        }

        if (!localStorage.getItem('closeNotesWithEscape')) {
            localStorage.setItem('closeNotesWithEscape', "true");
        }

        if (!localStorage.getItem('fontSizeInNotes')) {
            localStorage.setItem('fontSizeInNotes', "14");
        }

        if (!localStorage.getItem('showExactDatesInTheNotesList')) {
            localStorage.setItem('showExactDatesInTheNotesList', "false");
        }
    }
}