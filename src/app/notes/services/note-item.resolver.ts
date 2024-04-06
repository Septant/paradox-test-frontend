import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {NotesManager} from "./notes.manager";
import {Note} from "../../models/notes.model";

export const noteItemResolver: ResolveFn<Note> = (route, state) => {

  const manager = inject(NotesManager);

  const noteId = parseInt(route.params['noteId']);
  return manager.notes$.value.find(note => note.id === noteId) as Note;
};
