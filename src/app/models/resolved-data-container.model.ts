import {BehaviorSubject} from "rxjs";

export interface ResolvedDataContainer<T> {
  subject: BehaviorSubject<T>;
}
