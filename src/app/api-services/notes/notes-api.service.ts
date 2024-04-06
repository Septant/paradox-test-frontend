import {Injectable} from '@angular/core';
import {HttpService} from "../server/http.service";
import {ApiAction, ApiModule} from "../endpoints.model";
import {API} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Note} from "../../models/notes.model";

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  apiPath = API + ApiModule.NOTES;

  constructor(private http: HttpService) {
  }

  getNotes(): Observable<Note[]> {
    return this.http.GET<Note[]>(this.apiPath + ApiAction.ALL).pipe(
      map((notes: Note[] | null): Note[] => notes ? notes : [])
    );
  }

  getNote(noteId: number) {
    return this.http.GET<Note>(this.apiPath + noteId);
  }

  postNote(note: Note): Observable<Note | null> {
    return this.http.POST<Note>(this.apiPath + ApiAction.CREATE, note);
  }

/*  updateNote(id: number, patched: any): Observable<Note | null> {
    return this.http.PATCH<Note>(this.apiPath + id, {patched})
  }*/

  deleteNote(id: number): Observable<200 | null> {
    return this.http.DELETE(this.apiPath + id);
  }
}
