import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {Note} from "../../../models/notes.model";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less']
})
export class NoteComponent {

  note$: Observable<Note>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.note$ = this.route.data.pipe(
      map(({data}) => data)
    )
  }

  goBack() {
    this.router.navigate(['notes']);
  }
}
