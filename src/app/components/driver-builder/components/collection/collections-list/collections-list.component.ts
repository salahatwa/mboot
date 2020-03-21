import { Component, OnInit, ElementRef } from '@angular/core';
import { Page } from '../../../../../shared/shared-components/paging-lib/page';
import { Collection } from '../../../entities/collection';
import { CustomPaginationService } from '../../../../../shared/shared-components/paging-lib/services/custom-pagination.service';
import { ApiService } from '../../../../../shared/shared-services/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SnackBarService } from '../../../services/snackBar.service';
import { TranslateService } from '@ngx-translate/core';
import { InputDialogComponent } from '../../dialogs/inputDialog/inputDialog.component';
import { Operation } from '../../../utils/enums';
import { ErrorDialogComponent } from '../../../../../shared/shared-components/errorDialog/errorDialog.component';
import { BuilderService } from '../../../../../shared/shared-services/core/services/builder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../../../shared/shared-components/spinner/spinner.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../../dialogs/confirmationDialog/confirmationDialog.component';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {

  public showList:boolean=true;
  page: Page<Collection> = new Page();

  private subscription: Subscription;

  constructor(private router: Router,private builderService:BuilderService,private dialog: MatDialog,
    private paginationService: CustomPaginationService,  private snackBarService: SnackBarService, private translateService: TranslateService,
    private spinnerService: SpinnerService, private elRef: ElementRef) { 
      this.showList=true;
    }

 
  ngOnInit() {
    this.showList=true;
    this.getData();
    this.subscription = this.builderService.collectionsChanged$.subscribe(async () => await  this.getData());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  private getData(): void {

    this.showList=true;
    const progressRef = this.spinnerService.showProgress(this.elRef);    

    this.builderService.getAllCollections(this.page.pageable).subscribe(page => { this.page = page;
    this.spinnerService.detach(progressRef);
   });
  }


  public async addCollectionAsync(): Promise<void> {
   
    let titleText: string = await this.translateService.get('DialogTitles.AddCollection').toPromise();
    let placeholderText: string = await this.translateService.get('Input.Collection').toPromise();

    let dialogRef: MatDialogRef<InputDialogComponent> = this.dialog.open(InputDialogComponent, {
      width: '450px', data: { titleText: titleText, placeholderText: placeholderText }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let collection: Collection = new Collection(dialogRef.componentInstance.inputText);


        let operation: Operation = await this.builderService.addCollectionAsync(collection);

        switch (operation) {
          case Operation.Duplicate: {
            this.snackBarService.duplicateCollectionAsync(collection.name);
            break;
          }
          case Operation.Error: {
            let errorText: string = (await this.translateService.get('ErrorTexts.AddCollectionError', { collection: collection }).toPromise());
            this.dialog.open(ErrorDialogComponent, {
              width: '450px', data: { errorText: errorText }
            });
            break;
          }
          case Operation.Success:{
              this.snackBarService.changingCollectionsAsync(collection.name);
              // this.getData();
              break;
          }
          default: {
            // Other cases don't need handling
            break;
          }
        }
      }
    });
  }

  public async deleteCollection(collection: Collection): Promise<void> {

    let title: string = await this.translateService.get('DialogTitles.ConfirmDeleteCollection').toPromise();
    let text: string = await this.translateService.get('DialogTexts.ConfirmDeleteCollection', { collection: collection.name }).toPromise();

    let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {

      width: '450px', data: { dialogTitle: title, dialogText: text }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let operation: Operation = await this.builderService.deleteCollectionAsync(collection);

        if (operation === Operation.Error) {
          let errorText: string = (await this.translateService.get('ErrorTexts.DeleteCollectionError', { collection: collection.name }).toPromise());
          this.dialog.open(ErrorDialogComponent, {
            width: '450px', data: { errorText: errorText }
          });
        }
      }
    });
  }
  
  // confirmDeletion(project: Project) {
  //   this.modalService.openDialog(this.viewRef, {
  //     childComponent: ConfirmationModalComponent,
  //     data: () => this.delete(project)
  //   });
  // }

  // delete(project: Project): void {
  //   this.projectDataService.delete(project)
  //     .subscribe(() =>  {
  //       this.projectDeleteEvent.emit(null);
  //     });
  // }


  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }


}
