import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {TagsManager} from "./tags-manager";
import {Observable, tap} from "rxjs";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";
import {Tag} from "../../models/tags.model";

export const tagsCloudResolver: ResolveFn<ResolvedDataContainer<Tag[]>> = (route, state): Observable<ResolvedDataContainer<Tag[]>> => {
  return inject(TagsManager).getTags();
};
