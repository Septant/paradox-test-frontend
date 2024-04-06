import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotesComponent} from "./components/notes/notes.component";
import {notesResolver} from "./services/notes.resolver";
import {NoteRedactorComponent} from "./components/note-redactor/note-redactor.component";
import {noteRedactorResolver} from "./services/note-redactor.resolver";
import {NoteComponent} from "./components/note/note.component";
import {noteItemResolver} from "./services/note-item.resolver";
import {noteItemGuard} from "./services/note-item.guard";

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    resolve: {
      data: notesResolver
    }
  },
  {
    path: 'redactor',
    component: NoteRedactorComponent,
    resolve: {
      data: noteRedactorResolver
    }
  },
  {
    path: 'note/:noteId',
    component: NoteComponent,
    canActivate: [noteItemGuard],
    resolve: {
      data: noteItemResolver
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
