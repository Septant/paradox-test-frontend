import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotificationsComponent} from "./components/notifications-component/notifications.component";
import {notificationsResolver} from "./services/notifications.resolver";

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    resolve: {
      data: notificationsResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
