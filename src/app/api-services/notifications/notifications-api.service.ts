import { Injectable } from '@angular/core';
import {HttpService} from "../server/http.service";
import {Notification, NotificationBase} from "../../models/notifications.model";
import {API} from "../../../environments/environment";
import {ApiAction, ApiModule} from "../endpoints.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsApiService {

  apiPath = API + ApiModule.NOTIFICATIONS;
  constructor(private http: HttpService) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.GET<Notification[]>(this.apiPath + ApiAction.ALL).pipe(
      map((notifications: Notification[] | null): Notification[] => notifications ? notifications : [])
    );
  }

  addNotification(notificationBase: NotificationBase): Observable<Notification | null> {
    return this.http.POST<Notification>(this.apiPath + ApiAction.CREATE, notificationBase);
  }

  updateNotification(id: number, isResolved: boolean): Observable<Notification | null> {
    return this.http.PATCH<Notification>(this.apiPath + id, {isResolved});
  }
}
