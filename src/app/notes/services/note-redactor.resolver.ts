import {ResolveFn} from '@angular/router';
import {Note} from "../../models/notes.model";
import {inject} from "@angular/core";
import {NotesManager} from "./notes.manager";
import {of} from "rxjs";

export const noteRedactorResolver: ResolveFn<Note | null> = (route, state) => {
  const isNew = route.queryParams['new'];
  const id = parseInt(route.queryParams['id']);

  if (isNew) {
    return of(new Note());
  }

  const manager = inject(NotesManager);
  const fromLocalList =  manager.notes$.value.find(item => item.id === id);
  return fromLocalList ? fromLocalList : manager.getNote(id);
};
