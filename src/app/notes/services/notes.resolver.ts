import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {NotesManager} from "./notes.manager";
import {Note} from "../../models/notes.model";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";

export const notesResolver: ResolveFn<ResolvedDataContainer<Note[]>> = (route, state) => {
  return inject(NotesManager).getNotes();
};
