import {Injectable} from '@angular/core';
import {NotesApiService} from "../../api-services/notes/notes-api.service";
import {Note} from "../../models/notes.model";
import {BehaviorSubject, of, switchMap, tap} from "rxjs";
import {ResolvedDataContainer} from "../../models/resolved-data-container.model";

@Injectable({
  providedIn: 'root'
})
export class NotesManager {

  notes$ = new BehaviorSubject<Note[]>([]);

  constructor(private notesApi: NotesApiService) {
  }

  postNote(newNote: Note) {
    return this.notesApi.postNote(newNote);
  }

  getNotes() {
    return this.notesApi.getNotes().pipe(
      switchMap((notes: Note[]) => {
        if (notes.length) {
          this.notes$.next(notes);
        }
        return of({subject: this.notes$} as ResolvedDataContainer<Note[]>);
      }),
    );
  }

  getNote(noteId: number) {
    return this.notesApi.getNote(noteId).pipe(
      tap((note: Note | null) => {
        if (note) {
          const noteOfArrIdx = this.notes$.value.findIndex(item => note.id === item.id);
          noteOfArrIdx > 0 ? this.notes$.value[noteOfArrIdx] = note : this.notes$.value.push(note);
          this.notes$.next(this.notes$.value);
        }
      })
    );
  }

  deleteNote(noteId: number, idx: number) {
    return this.notesApi.deleteNote(noteId).pipe(
      tap(response => {
          if (response) {
            const notesUpd: Note[] = this.notes$.value;
            notesUpd.splice(idx, 1);
            this.notes$.next(notesUpd);
          }
        }
      ));
  }
}
