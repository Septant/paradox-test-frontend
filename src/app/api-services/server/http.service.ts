import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public GET<T>(path: string, dataKeys?: string[],
                dataValues?: string[]):Observable<T | null> {
    let params = new HttpParams();

    if (dataValues && dataKeys) {
      for (let i = 0; i < dataKeys.length; ++i) {
        params = params.append(dataKeys[i], dataValues[i]);
      }
    }

    return this.http.get<T>(path, {params: params, observe: 'response'})
      .pipe(map((response: HttpResponse<T>): T | null => (response.status === HttpStatusCode.Ok) ? response.body : null));
  }

  public POST<T>(path: string, data?: any):Observable<T | null> {
    return this.http.post<T>(path, data, {observe: "response"})
      .pipe(map((response: HttpResponse<T>) => (response.status === HttpStatusCode.Ok || response.status === HttpStatusCode.Created)
      ? response.body : null))
  }

  public PATCH<T>(path: string, data?: any): Observable<T | null> {
    return this.http.patch<T>(path, data, {observe: "response"})
      .pipe(map((response: HttpResponse<T>) => (response.status === HttpStatusCode.Ok)
      ? response.body : null));
  }

  public DELETE(path: string, data?: any): Observable<200 | null> {
    return this.http.delete(path, {observe: 'response', body: data}).pipe(map(response => response.status === 200 ? response.status : null));
  }
}
