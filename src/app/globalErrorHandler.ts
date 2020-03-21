import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './shared/shared-components/errorDialog/errorDialog.component';
import { Router } from '@angular/router';
// import { remote, BrowserWindow } from 'electron';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    public handleError(error): void {
        if(typeof error!= 'string')
        console.info(`Handling global error. Cause: ${error}.`);
        else
        console.info(`Handling global error. Cause: ${error}.`);

        // if(error.status==404)
        // {
        // let router: Router = this.injector.get(Router);
        //  router.navigate(['/not-found']);
        // }
        // else
        this.showGlobalErrorDialog();
    }

    public showGlobalErrorDialog(): void {
        console.log("Showing global error dialog");

        let dialog: MatDialog = this.injector.get(MatDialog);
        let zone: NgZone = this.injector.get(NgZone);

        zone.run(() => {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = dialog.open(ErrorDialogComponent, {
                // TranslationService is not able to provide the translation of texts in this class.
                // So we use a workaround where the translation happens in the error dialog itself.
                width: '450px', data: { isGlobalError: true }
            });

            dialogRef.afterClosed().subscribe(result => {
                // Quit the application
                console.log("Closing application");
                // let win: BrowserWindow = remote.getCurrentWindow();
                // win.close();
            });
        });
    }
}