import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Tag} from "../../../models/tags.model";
import {FormControl} from "@angular/forms";
import {TagsManager} from "../../services/tags-manager";
import {BehaviorSubject, defer, filter, map, Observable, switchMap, take, tap} from "rxjs";
import {ResolvedDataContainer} from "../../../models/resolved-data-container.model";

@Component({
  selector: 'app-tags-cloud-conponent',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsCloudComponent implements OnInit {

  // mock
  tags: Tag[] = [];
  addingNewTag: boolean = false;

  loader: boolean = false;

  tagsRef$!: Observable<Tag[]>;

  tagControl: FormControl = new FormControl<string[]>([]);

  destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute,
              private tagsManager: TagsManager,) {
  }

  ngOnInit(): void {
    // список тегов
    this.tagsRef$ = this.route.data.pipe(
      map(({data}) => data),
      switchMap((container: ResolvedDataContainer<Tag[]>): BehaviorSubject<Tag[]> => container.subject),
    );

    // добавление нового тега
    this.tagControl.valueChanges
      .pipe(
        filter((value: string[]): boolean => value !== null),
        map((value: string[]): string => value[0]),
        switchMap((value: string): Observable<Tag | null> => {
          this.loader = true;
          return this.tagsManager.addTag(value).pipe(tap(() => this.loader = false));
        }),
        filter((value: Tag | null): boolean => value !== null),
        takeUntilDestroyed(this.destroyRef))
      .subscribe((): void => {
        this.tagControl.setValue([], {emitEvent: false});
      });
  }

  addTag() {
    this.addingNewTag = true;
  }

  editTag(tagValue: string, index: number, tagId: number) {
    // ввиду отсутствия в taiga отдельного события на deleted обработано таким образом
    defer(() => tagValue
      ? this.tagsManager.updateTag(tagId, tagValue, index)
      : this.tagsManager.deleteTag(tagId, index))
      .pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe();
  }


  closeAdding() {
    this.addingNewTag = false;
  }

}
