import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../../../models/notes.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiDay, TuiTime} from "@taiga-ui/cdk";
import {deadlineValidator} from "../../../notifications/services/tui-datepicker.validator";
import {NotesManager} from "../../services/notes.manager";
import {Tag} from "../../../models/tags.model";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {TagsDialogComponent} from "../../../tags/components/tags-dialog/tags-dialog.component";

@Component({
  selector: 'app-note-redactor',
  templateUrl: './note-redactor.component.html',
  styleUrls: ['./note-redactor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteRedactorComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  noteForm!: FormGroup<{
    title: FormControl<string | null>;
    text: FormControl<string | null>;
    notifyTime: FormControl<[TuiDay, TuiTime] | null>;
    tags: FormControl<Tag[] | null>
  }>

  defaultDate = TuiDay.currentLocal();
  defaultTime = new TuiTime(TuiTime.currentLocal().hours, TuiTime.currentLocal().minutes);

  noteId: number | undefined = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private notesManager: NotesManager,
              @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector,
  ) {


  }

  ngOnInit(): void {
    this.route.data.pipe(map(({data}) => data), takeUntilDestroyed(this.destroyRef)).subscribe((data: Note) => {

      if (data.notifyTime) {
        this.defaultDate = TuiDay.normalizeParse(data.notifyTime.split(' ')[0], 'DMY');
        this.defaultTime = TuiTime.fromString(data.notifyTime.split(' ')[1]);
      }
      this.noteId = data.id;
      this.noteForm = this.fb.group({
        title: new FormControl<string>(data.title, [Validators.required]),
        text: new FormControl<string>(data.text, [Validators.required]),
        notifyTime: new FormControl<[TuiDay, TuiTime]>([this.defaultDate, this.defaultTime], deadlineValidator()),
        tags: new FormControl<Tag[]>(data.tags)
      });
    });

  }

  createNote() {
    if (this.noteForm.valid) {

      const requestData: Note = new Note();

      requestData.id = this.noteId ? this.noteId : requestData.id;
      requestData.title = this.noteForm.value.title as string;
      requestData.text = this.noteForm.value.text as string;

      requestData.notifyTime = (this.noteForm.value.notifyTime?.[0] as TuiDay).toString() + ' ' + (this.noteForm.value.notifyTime?.[1] as TuiTime).toString();
      requestData.tags = this.noteForm.value.tags as Tag[];
      this.notesManager.postNote(requestData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.goBack());

    }
  }

  goBack() {
    this.router.navigate(['notes']);
  }

  addTags() {
    this.dialogs.open<Tag[]>(new PolymorpheusComponent(TagsDialogComponent, this.injector),
      {
        label: 'Выберите теги',
        data: this.noteForm.controls.tags.value,
        dismissible: false,
        closeable: false,
        size: "l"
      }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((selected: Tag[]) => {
      this.noteForm.controls.tags.setValue(selected);
    });
  }
}
