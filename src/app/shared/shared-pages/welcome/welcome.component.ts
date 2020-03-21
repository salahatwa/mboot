import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { remote } from 'electron';
import { Constants } from '../../../components/driver-builder/utils/constants';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'welcome-page',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
    constructor(private translate: TranslateService, private dialog: MatDialog, private zone: NgZone,
        public router: Router) {
    }

    public applicationName: string = Constants.applicationName.toUpperCase();
    public isBusy: boolean = false;

    public ngOnInit(): void {
    }

    public async openDirectoryChooserAsync(): Promise<void> {
        console.log("Opening directory chooser");

        let selectFolderText: string = await this.translate.get('DialogTitles.SelectFolder').toPromise();

       

       // this.dialog.showOpenDialog({ title: selectFolderText, properties: ['openDirectory'] }, (folderPath) => {
         //   if (folderPath === undefined) {
           //     console.log("No folder was selected");
             //   return;
            //}

            let selectedParentDirectory: string = '/home/salah/test';
            console.log(`Selected directory: '${selectedParentDirectory}'`);

            console.log('Open folder.............');
            // await this.collectionService.initializeAsync();
    
            this.isBusy = false;
    
            this.router.navigate(['/collection']);

            this.zone.run(async () => {
                this.isBusy = true;

               // if (!await this.collectionService.setStorageDirectoryAsync(selectedParentDirectory)) {
                 //   let errorText: string = await this.translate.get('ErrorTexts.StorageDirectoryCreationError', { storageDirectory: selectedParentDirectory }).toPromise();
                   // this.dialog.open(ErrorDialogComponent, {
                     //   width: '450px', data: { errorText: errorText }
                    //});
               // }

                // await this.collectionService.initializeAsync();

                this.isBusy = false;

                this.router.navigate(['/collection']);
          //  });
        });
    }
}
