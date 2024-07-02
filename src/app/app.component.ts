import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { HeaderPageComponent } from './shared/header-page/header-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderTableComponent, TableProductsComponent, HeaderPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'productos-financieros';
}
