import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {NotificationsManager} from "./notifications.manager";
import {Notification} from "../../models/notifications.model";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";

export const notificationsResolver: ResolveFn<ResolvedDataContainer<Notification[]>> = (route, state) => {
  return inject(NotificationsManager).getNotifications();
};
