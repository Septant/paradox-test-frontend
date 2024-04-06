import {Injectable} from '@angular/core';
import {TagsApiService} from "../../api-services/tags/tags-api.service";
import {Tag} from "../../models/tags.model";
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";

@Injectable({
  providedIn: 'root'
})
export class TagsManager {

  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  constructor(private tagsApi: TagsApiService) {
  }

  getTags() {
    return this.tagsApi.getTags().pipe(
      switchMap((tags: Tag[] | null) => {
        if (tags) {
          this.tags$.next(tags);
        }
        return of({subject: this.tags$} as ResolvedDataContainer<Tag[]>);
      })
    );
  }

  addTag(val: string) {
    return this.tagsApi.addTag(val).pipe(
      tap((tag: Tag | null): void | null => tag ? this.tags$.next([...this.tags$.value, tag]) : null)
    );
  }

  updateTag(tagId: number, value: string, index: number): Observable<Tag | null> {

    return this.tagsApi.updateTag(tagId, value).pipe(
      tap((tag: Tag | null): void => {
        if (tag) {
          const tagsUpd: Tag[] = this.tags$.value;
          tagsUpd[index] = tag;
          this.tags$.next(tagsUpd);
        }
      })
    );
  }

  deleteTag(tagId: number, index: number) {

    return this.tagsApi.deleteTag(tagId).pipe(
      tap((response: 200 | null): void => {
        if (response) {
          const tagsUpd: Tag[] = this.tags$.value;
          tagsUpd.splice(index, 1);
          this.tags$.next(tagsUpd);
        }
      })
    );
  }
}
