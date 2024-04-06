import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {NotesManager} from "./notes.manager";
import {firstValueFrom} from "rxjs";
import {Note} from "../../models/notes.model";

export const noteItemGuard: CanActivateFn = async (route, state) => {
  const manager = inject(NotesManager);

  const noteId = parseInt(route.params['noteId']);
  const note = manager.notes$.value.find(item => item.id === noteId);
  const canActivate = note ? true : await firstValueFrom(manager.getNote(noteId)).then((response: Note | null): boolean => !!response);
  return canActivate;
};
