import { Notification } from './notification';

export class Notifier {

  public notifications: Notification[] = [];

  public destroy(notification: Notification): void {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  public add(notification: Notification): void {
    this.notifications.unshift(notification);
  }
}
