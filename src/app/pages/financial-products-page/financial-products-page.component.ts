import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderTableComponent } from '../../components/header-table/header-table.component';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from '../../services/product-http.service';

@Component({
  selector: 'app-financial-products-page',
  standalone: true,
  imports: [CommonModule,TableProductsComponent, HeaderTableComponent],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss'
})
export class FinancialProductsPageComponent implements OnInit {


  private productoHttpService = inject(ProductHttpService);
  products$: Observable<ProductInterface[]> = new Observable();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.products$ = this.productoHttpService.getProducts();
  }

}
