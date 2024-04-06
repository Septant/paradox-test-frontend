import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {TagsManager} from "../../services/tags-manager";
import {Observable, switchMap} from "rxjs";
import {Tag} from "../../../models/tags.model";
import {ResolvedDataContainer} from "../../../models/resolved-data-container.model";
import {TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-tags-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsDialogComponent implements OnInit {

  tags$!: Observable<Tag[]>;

  selectedTags: Tag[] = [];

  constructor(private tagsManager: TagsManager,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<Tag[], Tag[]>) {
    this.tags$ = this.tagsManager.getTags().pipe(switchMap((container: ResolvedDataContainer<Tag[]>) => container.subject));


  }

  ngOnInit(): void {
    this.selectedTags.push(...this.context.data);
  }

  selectTag(tag: Tag) {
    this.isTagSelected(tag)
      ? this.selectedTags.splice(this.selectedTags.findIndex(item => item.id === tag.id), 1)
      : this.selectedTags.push(tag);
  }

  addSelected() {
    this.context.completeWith(this.selectedTags);
  }

  isTagSelected(tagFromList: Tag) {
    return !!this.selectedTags.find(item => item.id === tagFromList.id)
  }


}
