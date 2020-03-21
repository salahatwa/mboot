import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
// import { remote } from 'electron';
import { Constants } from '../utils/constants';
import { Subscription, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppearanceService {
    // private globalEmitter = remote.getGlobal('globalEmitter');

    private subscription: Subscription;
    private themeChangedEvent:Subject<String> = new Subject();
    public themeChangedEvent$: Observable<any> = this.themeChangedEvent.asObservable();

    constructor(private settingsService: SettingsService) { }


    
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

    public setTheme(themeName: string): void {
        this.settingsService.theme = themeName;
        this.themeChangedEvent.next(themeName);
        // Global event because all windows need to be notified
        // this.globalEmitter.emit(Constants.themeChangedEvent, themeName);
    }
}