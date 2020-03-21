import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppearanceService } from './components/driver-builder/services/appearance.service';
import { SettingsService } from './components/driver-builder/services/settings.service';
//import { remote } from 'electron';
import { Constants } from './components/driver-builder/utils/constants';
import { Subscription, Subject, Observable } from 'rxjs';
import { UserService } from './shared/shared-services/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  today: number = Date.now();
  
  private subscription: Subscription;

  constructor(public router: Router, private appearanceService: AppearanceService,
    private translateService: TranslateService,
    private settingsService: SettingsService, private overlayContainer: OverlayContainer, private userService: UserService) {

    this.settingsService.initialize();

    this.applyTheme(this.settingsService.theme);

    this.translateService.setDefaultLang(this.settingsService.defaultLanguage);
    this.translateService.use(this.settingsService.language);
  }
  
  
  public selectedTheme: string;

  public ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription=this.appearanceService.themeChangedEvent$.subscribe((themeName) =>  this.applyTheme(themeName));
    // this.router.navigate(['/collection']);
    this.userService.populate();
    this.closeOpenedTab();
  }

  /**
   * This for logout all current opened tab if user logged out
   */
  private closeOpenedTab() :void
  {
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
           let token = localStorage.getItem('jwtToken');
           if(token == undefined) { 
             // Perform logout
             //Navigate to login/home
              this.router.navigate(['/']); 
           }
      }
  });
  }

  private applyTheme(themeName: string): void {
    // Apply theme to app container
    this.selectedTheme = themeName;

    // Apply theme to components in the overlay container
    // https://gist.github.com/tomastrajan/ee29cd8e180b14ce9bc120e2f7435db7
    let overlayContainerClasses: DOMTokenList = this.overlayContainer.getContainerElement().classList;
    let themeClassesToRemove: string[] = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));

    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }

    overlayContainerClasses.add(themeName);
  }
}
