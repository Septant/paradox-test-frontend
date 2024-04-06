import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { NoteRedactorComponent } from './components/note-redactor/note-redactor.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiButtonModule, TuiScrollbarModule, TuiSvgModule} from "@taiga-ui/core";
import {NotesRoutingModule} from "./notes-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputDateTimeModule, TuiInputModule, TuiTagModule, TuiTextareaModule} from "@taiga-ui/kit";



@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    NoteRedactorComponent
  ],
  imports: [
    NotesRoutingModule,
    CommonModule,
    TuiTableModule,
    TuiButtonModule,
    TuiSvgModule,
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiTagModule,
    TuiScrollbarModule,
  ]
})
export class NotesModule { }
