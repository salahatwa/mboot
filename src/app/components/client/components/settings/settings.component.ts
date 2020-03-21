import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService,User } from './../../../../shared/shared-services/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AppearanceService } from './../../../../components/driver-builder/services/appearance.service';
import { SettingsService } from './../../../../components/driver-builder/services/settings.service';
import { Constants } from './../../../../components/driver-builder/utils/constants';
import { Language } from './../../../../components/driver-builder/utils/language';
import { Theme } from './../../../../components/driver-builder/utils/theme';
import { matchingPasswords } from '../../utils/validator';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrls:['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public editEnabled = true;
  public picurl: string;

  
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: [];
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private titleService: Title,
    private translateService: TranslateService, private appearanceService: AppearanceService,
    private settingsService: SettingsService
  ) {
    // create form group using the form builder

    Object.assign(this.user, this.userService.getCurrentUser());

    console.log(this.user);
    this.settingsForm = this.fb.group({
      image: this.user.profile.image,
      username: this.user.profile.username,
      bio: this.user.profile.bio,
      email: this.user.profile.image,
      oldPassword: this.user.profile.oldpass,
      newPassword: [this.user.profile.newpass, Validators.required] ,
      confirmPassword: [this.user.profile.confirmpass, Validators.required]
    }
    ,
    { validator: matchingPasswords('newPassword', 'confirmPassword')}
    );
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
   // Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
  //  this.settingsForm.patchValue(this.user.profile);
   this.titleService.setTitle("Setting "+this.user.profile.username);
   this.selectedTheme = this.settingsService.theme;
  }

 

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.settingsForm.value)
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.profile.username),
      err => {
        this.errors = err.errors;
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user.profile, values);
  }



  hideOld = true;
  hideNew = true;

  public languages: Language[] = Constants.languages;
  public themes: Theme[] = Constants.themes;
  public fontSizes: number[] = [14, 16, 18, 20, 22, 24];
  public selectedTheme: string;

  public get selectedLanguage(): Language {
    let languageCode: string = this.settingsService.language;
    return this.languages.find(x => x.code === languageCode);
  }
  public set selectedLanguage(v: Language) {
    this.settingsService.language = v.code;
    this.translateService.use(v.code);
  }

  public get closeNotesWithEscapeChecked(): boolean {
    return this.settingsService.closeNotesWithEscape;
  }
  public set closeNotesWithEscapeChecked(v: boolean) {
    this.settingsService.closeNotesWithEscape = v;
  }

  public get selectedFontSize(): number {
    return this.settingsService.fontSizeInNotes;
  }
  public set selectedFontSize(v: number) {
    this.settingsService.fontSizeInNotes = v;
  }

  public get showExactDatesInTheNotesListChecked(): boolean {
    return this.settingsService.showExactDatesInTheNotesList;
  }
  public set showExactDatesInTheNotesListChecked(v: boolean) {
    this.settingsService.showExactDatesInTheNotesList = v;
  }

  

  public import(): void {
    // let dialogRef: MatDialogRef<ImportFromOldVersionDialogComponent> = this.dialog.open(ImportFromOldVersionDialogComponent, {
    //   width: '450px'
    // });
  }

  public setTheme(themeName: string): void {
    this.selectedTheme = themeName;
    this.appearanceService.setTheme(themeName);
  }

}
