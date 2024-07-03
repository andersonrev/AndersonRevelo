import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPageComponent } from './shared/header-page/header-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'productos-financieros';

  constructor(){

  }


}
