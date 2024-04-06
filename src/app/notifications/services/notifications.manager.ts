import {Injectable} from '@angular/core';
import {NotificationsApiService} from "../../api-services/notifications/notifications-api.service";
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {Notification, NotificationBase} from "../../models/notifications.model";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsManager {

  notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor(private notificationsApi: NotificationsApiService) {
  }

  getNotifications() {
    return this.notificationsApi.getNotifications().pipe(
      switchMap((notifications: Notification[]) => {
        if (notifications.length) {
          this.notifications$.next(notifications);
        }
        return of({subject: this.notifications$} as ResolvedDataContainer<Notification[]>);
      }),
    );
  }

  addNotification(data: NotificationBase) {
    return this.notificationsApi.addNotification(data).pipe(
      tap((notification: Notification | null): void | null => notification ? this.notifications$.next([...this.notifications$.value, notification]) : null)
    );
  }

  updateNotificationStatus(id: number, isResolved: true): Observable<Notification | null> {
    return this.notificationsApi.updateNotification(id, isResolved).pipe(
      tap((notification: Notification | null): void => {
        if (notification) {
          (this.notifications$.value.find(item => item.id === id) as Notification).isResolved = notification.isResolved;
          this.notifications$.next(this.notifications$.value);
        }
      }));
  }

}
