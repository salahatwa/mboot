import { NgModule, ErrorHandler } from '@angular/core';
import { CollectionComponent } from './components/collection/collection.component';
import { NotesComponent } from './components/notes/notes.component';
import { LicenseDialogComponent } from './components/dialogs/licenseDialog/licenseDialog.component';
import { RenameCollectionDialogComponent } from './components/dialogs/renameCollectionDialog/renameCollectionDialog.component';
import { RenameNotebookDialogComponent } from './components/dialogs/renameNotebookDialog/renameNotebookDialog.component';
import { ErrorDialogComponent } from './../../shared/shared-components/errorDialog/errorDialog.component';
import { InputDialogComponent } from './components/dialogs/inputDialog/inputDialog.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmationDialog/confirmationDialog.component';
import { DialogHeaderComponent } from './components/dialogs/dialogHeader/dialogHeader.component';
import { ChangeNotebookDialogComponent } from './components/dialogs/changeNotebookDialog/changeNotebookDialog.component';
import { ImportFromOldVersionDialogComponent } from './components/dialogs/importFromOldVersionDialog/importFromOldVersionDialog.component';
import { ActiveAppAndSearchComponent } from './components/activeAppAndSearch/activeAppAndSearch.component';
import { NoteComponent } from './components/note/note.component';
import { WebviewDirective } from './directives/webview.directive';
import { TruncatePipe } from './pipes/truncatePipe';
import { DriverBuilderComponent } from './driver-builder.component';
import { SettingsService } from './services/settings.service';
import { FileService } from './services/file.service';
import { TemplateControllerService } from './services/template-controller.service';
import { GlobalErrorHandler } from './../../globalErrorHandler';
import { SharedModule } from './../../shared/shared-module/shared.module';
import { DriverRoutingModule } from './driver-routing.module';
import { SelectFormTemplateDialogComponent } from './components/dialogs/selectFormTemplateDialog/select-form-template-dialog.component';
import { CollectionsListComponent } from './components/collection/collections-list/collections-list.component';

import { NoteSettingComponent } from './components/note/note-setting.component';
import { UiFormBuilderModule } from '../ui-form-builder/ui-form-builder.module';
import { MatPagesModule } from './../../shared/shared-components/page-stepper/public-api';
import { PublishDialogComponent } from './components/dialogs/publishAppDialog/publishDialog.component';
import { EditNoteDialogComponent } from './components/dialogs/editNoteDialog/edit-note-dialog.component';
import { EditFolderDialogComponent } from './components/dialogs/editFolderDialog/edit-folder-dialog.component';


@NgModule({
  declarations: [ 
    CollectionComponent,
    NotesComponent,
    LicenseDialogComponent,
    RenameCollectionDialogComponent,
    RenameNotebookDialogComponent,
    ErrorDialogComponent,
    InputDialogComponent,
    ConfirmationDialogComponent,
    PublishDialogComponent,
    DialogHeaderComponent,
    ChangeNotebookDialogComponent,
    ImportFromOldVersionDialogComponent,
    ActiveAppAndSearchComponent,
    NoteComponent,
    WebviewDirective,
    TruncatePipe,
    DriverBuilderComponent,
    SelectFormTemplateDialogComponent,
    CollectionsListComponent,
    NoteSettingComponent,
    EditFolderDialogComponent,
    EditNoteDialogComponent
  ],
  imports: [
    MatPagesModule.forRoot(),
    SharedModule,
    DriverRoutingModule,
    UiFormBuilderModule,
  ]
  ,
  exports:[  ]
  ,
  providers: [
    SettingsService,
    FileService,
    TemplateControllerService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  entryComponents: [
    LicenseDialogComponent, InputDialogComponent, ErrorDialogComponent, RenameCollectionDialogComponent, 
    ImportFromOldVersionDialogComponent, RenameNotebookDialogComponent, ConfirmationDialogComponent, 
    ChangeNotebookDialogComponent,SelectFormTemplateDialogComponent,PublishDialogComponent,EditFolderDialogComponent,EditNoteDialogComponent
  ]
})
export class DriverBuilderModule { }
