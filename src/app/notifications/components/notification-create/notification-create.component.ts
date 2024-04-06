import {ChangeDetectorRef, Component, DestroyRef, EventEmitter, Inject, inject, Output} from '@angular/core';
import {tuiIconFeather} from "@taiga-ui/icons";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiDay, TuiTime} from "@taiga-ui/cdk";
import {deadlineValidator} from "../../services/tui-datepicker.validator";
import {NotificationsManager} from "../../services/notifications.manager";
import {finalize, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.less']
})
export class NotificationCreateComponent {
  notificationForm: FormGroup<{
    text: FormControl<string | null>;
    deadline: FormControl<(TuiDay | TuiTime)[] | null>;
  }>;

  loading: boolean = false;

  defaultDate = new TuiDay(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  defaultTime = new TuiTime(0o0, 0o0);

  @Output() created = new EventEmitter<boolean>();

  destroyRef = inject(DestroyRef);

  protected readonly tuiIconFeather = tuiIconFeather;

  constructor(private fb: FormBuilder,
              public notificationsManager: NotificationsManager,
              private cdr: ChangeDetectorRef,
              @Inject(TuiAlertService) private readonly alerts: TuiAlertService,) {
    this.notificationForm = this.fb.group({
      text: new FormControl<string>('', [Validators.required]),
      deadline: new FormControl<(TuiDay | TuiTime)[]>([this.defaultDate, this.defaultTime], deadlineValidator())
    });
  }

  confirmCreate() {
    if (this.notificationForm.valid) {
      this.loading = true;

      const data = this.notificationForm.value;
      const [date, time] = [data.deadline![0] as TuiDay, data.deadline![1] as TuiTime]
      const localdate = new Date(date.year, date.month, date.day, time.hours, time.minutes).toString();

      this.notificationsManager.addNotification({deadline: localdate, text: data.text as string})
        .pipe(
          take(1),
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.created.emit(true);
            this.loading = false;
            this.notificationForm.reset({text: null, deadline: [this.defaultDate, this.defaultTime]});
          })
        )
        .subscribe();
    } else {
      this.alerts.open('Не все обязательные поля заполнены!',
        {
          status: 'warning',
          autoClose: true,
          hasCloseButton: true,
        }
      ).pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)).subscribe();
    }

  }

  declineCreate() {
    this.created.emit(true);
    this.notificationForm.reset({text: null, deadline: [this.defaultDate, this.defaultTime]});
  }
}
