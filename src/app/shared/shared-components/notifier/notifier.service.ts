import { Injectable } from '@angular/core';
import { Notifier } from './notifier';
import { NotificationType } from './notification-type';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public notifier = new Notifier();

  public notify(message: string, notificationType: NotificationType, duration: number = 8000): void {

    const notification: Notification = new Notification(message, notificationType);

    const dismissWait = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };

    this.notifier.add(notification);

    dismissWait();
    
  }
}
