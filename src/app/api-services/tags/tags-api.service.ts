import { Injectable } from '@angular/core';
import {HttpService} from "../server/http.service";
import {API} from "../../../environments/environment";
import {ApiAction, ApiModule} from "../endpoints.model";
import {Tag} from "../../models/tags.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsApiService {

  readonly apiPath = API + ApiModule.TAGS;

  constructor(private http: HttpService) { }

  addTag(value: string) {
    return this.http.POST<Tag>(this.apiPath + ApiAction.CREATE, {value});
  }

  getTags(): Observable<Tag[] | null> {
    return this.http.GET<Tag[]>(this.apiPath + ApiAction.ALL);
  }

  updateTag(id: number,value: string): Observable<Tag | null> {
    return this.http.PATCH<Tag>(this.apiPath + id, {id, value});
  }

  deleteTag(tagId: number): Observable<200 | null> {
    return this.http.DELETE(this.apiPath + tagId);
  }
}
