import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {Notification} from "../../../models/notifications.model";
import {FormControl} from "@angular/forms";
import {NotificationsManager} from "../../services/notifications.manager";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCardComponent implements OnInit {


  @Input() notification!: Notification;

  resolvedControl = new FormControl<boolean>(false);

  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private notificationsManager: NotificationsManager) {

  }

  ngOnInit(): void {
    this.resolvedControl.setValue(this.notification.isResolved);
    this.resolvedControl.valueChanges.pipe(
      switchMap((value: boolean | null) => {
        return value ? this.notificationsManager.updateNotificationStatus(this.notification.id, value) : of(null);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
