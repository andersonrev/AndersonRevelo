import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsToastService {

  showToastSubject = new Subject<{ text: string, type: string }>();

  constructor() { }

  showToast(type: 'success' | 'error', text: string) {
    this.showToastSubject.next({ text, type });
  }
}
