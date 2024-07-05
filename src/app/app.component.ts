import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsToastService } from './services/notifications/notifications-toast.service';
import { HeaderPageComponent } from './shared/header-page/header-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'productos-financieros';

  @ViewChild('toast') toats!: TemplateRef<any>;

  toastType = { text: '', type: '' };

  notificationService = inject(NotificationsToastService);
  container = inject(ViewContainerRef);

  ngOnInit(): void {
    const sub = this.notificationService.showToastSubject.subscribe({
      next: (toast) => {
        this.toastType = toast;
        this.showToaster()
      }
    });

  }

  showToaster() {
    this.container.createEmbeddedView(this.toats, this);
    setTimeout(() => { this.container.clear() }, 1500)
  }


}

