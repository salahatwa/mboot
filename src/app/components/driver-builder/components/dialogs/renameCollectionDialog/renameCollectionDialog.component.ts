import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ErrorDialogComponent } from '../../../../../shared/shared-components/errorDialog/errorDialog.component';
import { Operation } from '../../../utils/enums';
import { SnackBarService } from '../../../services/snackBar.service';
import { Collection } from '../../../entities/collection';
import { BuilderService } from './../../../../../shared/shared-services/core/services/builder.service';

@Component({
    selector: 'rename-collection-dialog',
    templateUrl: './renameCollectionDialog.component.html',
    styleUrls: ['./renameCollectionDialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RenameCollectionDialogComponent implements OnInit {
    constructor(private builderService:BuilderService, private dialogRef: MatDialogRef<RenameCollectionDialogComponent>,
        private translateService: TranslateService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
        private snackBarService: SnackBarService) {
        dialogRef.disableClose = true;
    }

    public newCollection: Collection = new Collection(this.data.oldCollection.name);

    public ngOnInit(): void {
    }

    public async renameCollectionAsync(): Promise<void> {
        // let operation: Operation = await this.builderService.renameCollectionAsync(this.data.oldCollection, this.newCollection);

        // if (operation === Operation.Error) {
        //     let errorText: string = (await this.translateService.get('ErrorTexts.RenameCollectionError', { collection: this.newCollection }).toPromise());

        //     this.dialog.open(ErrorDialogComponent, {
        //         width: '450px', data: { errorText: errorText }
        //     });
        // } else if (operation === Operation.Duplicate) {
        //     this.snackBarService.duplicateCollectionAsync(this.newCollection.name);
        // }
    }

    public async renameCollectionAndCloseAsync(): Promise<void> {
        await this.renameCollectionAsync();
        this.dialogRef.close();
    }
}
