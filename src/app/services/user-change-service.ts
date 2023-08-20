import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChangeService {
  private userChangedSubject = new Subject<void>();

  userChanged$ = this.userChangedSubject.asObservable();

  notifyUserChanged() {
    this.userChangedSubject.next();
  }
}
