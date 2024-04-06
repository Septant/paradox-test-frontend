import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsCloudComponent } from './components/tags-cloud-conponent/tags-cloud.component';
import { TagsRoutingModule } from './tags-routing.module';
import {TuiInputTagModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiClickOutsideModule} from "@taiga-ui/cdk";
import { TagsDialogComponent } from './components/tags-dialog/tags-dialog.component';



@NgModule({
  declarations: [
    TagsCloudComponent,
    TagsDialogComponent,
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    TuiTagModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiInputTagModule,
    ReactiveFormsModule,
    TuiClickOutsideModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule
  ],
})
export class TagsModule { }
