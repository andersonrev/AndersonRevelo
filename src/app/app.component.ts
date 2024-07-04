import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPageComponent } from './shared/header-page/header-page.component';
import { NotificationsToastService } from './services/notifications/notifications-toast.service';

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

  textToast = '';

  notificationService = inject(NotificationsToastService);
  constructor(private readonly container: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.notificationService.showToastSubject.subscribe({
      next: (toast) => {
        console.log('toast mostrar');
        this.textToast = toast;
        this.showToaster()
      }
    })
  }

  showToaster() {
    this.container.createEmbeddedView(this.toats, this);
    setTimeout(() => { this.container.clear() }, 1500)
  }


}
