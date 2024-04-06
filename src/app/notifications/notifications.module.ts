import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationsComponent} from "./components/notifications-component/notifications.component";
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {
  TuiButtonModule,
  TuiDropdownModule, TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiInputDateModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiInputTimeModule
} from "@taiga-ui/kit";
import { NotificationCardComponent } from './components/notification-card/notification-card.component';
import { NotificationCreateComponent } from './components/notification-create/notification-create.component';
import {TuiActiveZoneModule, TuiObscuredModule} from "@taiga-ui/cdk";



@NgModule({
  declarations: [NotificationsComponent, NotificationCardComponent, NotificationCreateComponent,],
  imports: [
    NotificationsRoutingModule,
    CommonModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiInputDateTimeModule,
    TuiSvgModule,
    TuiCheckboxModule,
    TuiCheckboxLabeledModule,
    TuiScrollbarModule,
    TuiDropdownModule,
    TuiActiveZoneModule,
    TuiObscuredModule,
    TuiLoaderModule
  ],
  exports: []
})
export class NotificationsModule { }
