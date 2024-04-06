import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotesManager} from "../../services/notes.manager";
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {Note} from "../../../models/notes.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ResolvedDataContainer} from "../../../models/resolved-data-container.model";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.less']
})
export class NotesComponent implements OnInit {

  columns = ['№', 'Название', 'Дата напоминания', 'Теги', 'Действия'];

  notes$: Observable<Note[]>;

  destroyRef = inject(DestroyRef);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notesManager: NotesManager) {
    this.notes$ = this.route.data.pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        map(({data}) => data),
        switchMap((container: ResolvedDataContainer<Note[]>): BehaviorSubject<Note[]> => container.subject));
  }

  ngOnInit(): void {
  }

  createNote(): void {
    this.router.navigate(['redactor'], {queryParams: {new: true}, relativeTo: this.route});
  }

  openNote(id: number | undefined) {
    this.router.navigate(['note', id], {relativeTo: this.route});
  }

  redactNote(id: number | undefined) {
    this.router.navigate(['redactor'], {relativeTo: this.route, queryParams: {id}});
  }

  deleteNote(id: number | undefined, index: number) {
    this.notesManager.deleteNote(id as number, index).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
