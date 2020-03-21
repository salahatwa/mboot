import { Component } from '@angular/core';
import { NotifierService } from './notifier.service';
import { Notifier } from './notifier';
import { notifyAnimation } from './animations';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  animations: [
    notifyAnimation,
  ]
})
export class NotifierComponent {

  get src(): Notifier {
    return this._notifierService.notifier;
  }

  constructor(
    private _notifierService: NotifierService
  ) { }
}
