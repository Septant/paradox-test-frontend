import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TagsCloudComponent} from "./components/tags-cloud-conponent/tags-cloud.component";
import {tagsCloudResolver} from "./services/tags-cloud.resolver";

const routes: Routes = [
  {
    path: '',
    component: TagsCloudComponent,
    resolve: {
      data: tagsCloudResolver
    }
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {
}
