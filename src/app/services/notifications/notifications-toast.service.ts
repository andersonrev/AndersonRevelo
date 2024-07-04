import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsToastService {

  showToastSubject = new Subject<string>();

  constructor() { }

  showToast(text: string) {
    this.showToastSubject.next(text);
  }
}
