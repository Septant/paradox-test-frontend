import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {NotificationsManager} from "../../services/notifications.manager";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute} from "@angular/router";
import {Notification} from "../../../models/notifications.model";
import * as moment from "moment/moment";
import {ResolvedDataContainer} from "../../../models/resolved-data-container.model";

@Component({
  selector: 'app-notifications-component',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {

  open = false;


  isCreating: boolean = false;

  destroyRef = inject(DestroyRef);

  notifications$: Observable<Notification[]>;

  constructor(public notificationsManager: NotificationsManager,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {

    this.notifications$ = this.route.data.pipe(
      map(({data}) => data),
      switchMap((container: ResolvedDataContainer<Notification[]>): BehaviorSubject<Notification[]> => container.subject),
      map((notifications: Notification[]): Notification[] => notifications
        .map(item => ({...item, deadline: moment(item.deadline).format('YYYY-MM-DD HH:mm')}))
      ),
      takeUntilDestroyed(this.destroyRef)
    )
  }


  createNotification() {
    this.isCreating = true;
  }

  drawBack(event: boolean) {
    this.isCreating = !event;
  }

  sortByReady(): void {
    this.notifications$ = this.notifications$.pipe(
      map((notifications: Notification[]): Notification[] => notifications.sort((prev, next) =>
        (prev.isResolved && !next.isResolved ? 1 : !(prev.isResolved && next.isResolved) ? -1 : 0)
      )));
  }

  sortByDate(): void {
    this.notifications$ = this.notifications$.pipe(
      map((notifications: Notification[]): Notification[] => notifications.sort((prev, next) => {
        const prevData = moment(prev.deadline);
        const nextData = moment(next.deadline);
        return prevData.isBefore(nextData) ? -1 : prevData.isAfter(nextData) ? 1 : 0;
      })));
  }

  sortById(): void {
    this.notifications$ = this.notifications$.pipe(
      map((notifications: Notification[]): Notification[] => notifications.sort((prev, next) => prev.id - next.id)));
  }
}
