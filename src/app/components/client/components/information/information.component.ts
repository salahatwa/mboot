import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Constants } from '../../../../components/driver-builder/utils/constants';
import { LicenseDialogComponent } from '../../../../components/driver-builder/components/dialogs/licenseDialog/licenseDialog.component';
import { IPayPalConfig, ICreateOrderRequest } from './../../../../shared/shared-components/ngx-paypal-lib/public_api';

@Component({
  selector: 'information-page',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InformationComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  public defaultPrice: string = '1.00';
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;

  private initConfig(price: string): void {
    this.payPalConfig = {
    currency: 'EUR',
    // clientId: 'AZkFb9JEjSp_8nn5l3Y4ui8OSgbrTcxnHJHaG5hIrhOULlcHhGBj5aYLd430Iv1a6cz27jiaYpfh_h0F',
    clientId:'Adyk806t0tQXECQUGwZBLDZkC2T0lGvudCs8UU0sIjMMfQZcbRtQbwPNxNwqpjzQNaqe4dvZuW6dWb_J',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: price,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: price
              }
            }
          },
          items: [
            {
              name: 'DONATION',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: price,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });

    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel = true;

    },
    onError: err => {
      console.log('OnError', err);
      this.showError = true;
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
      this.resetStatus();
    },
    onInit: (data, actions) => {
      console.log('onInit', data, actions);
    }
  };

  
  }

  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  @ViewChild('priceElem') priceElem?: ElementRef;

  changePrice(): void {
    if (this.priceElem) {
      this.initConfig(this.priceElem.nativeElement.value);
    }
  }

  constructor(private dialog: MatDialog) {
  }

  public applicationVersion: string = Constants.applicationVersion;
  public applicationCopyright: string = Constants.applicationCopyright;
  public websiteUrl: string = Constants.websiteUrl;
  public twitterUrl: string = Constants.twitterUrl;
  public githubUrl: string = Constants.githubUrl;
  public externalComponents: any[] = Constants.externalComponents;

  public ngOnInit(): void {
    this.initConfig(this.defaultPrice);
  }

  public openLicenseDialog(): void {
    let dialogRef: MatDialogRef<LicenseDialogComponent> = this.dialog.open(LicenseDialogComponent, {
      width: '450px'
    });
  }

  public openDonateLink(): void {
    
    window.open(Constants.donateUrl, "_blank");
    // require('electron').shell.openExternal(Constants.donateUrl);
  }
}
