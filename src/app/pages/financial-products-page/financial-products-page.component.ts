import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from '../../services/product-http.service';

@Component({
  selector: 'app-financial-products-page',
  standalone: true,
  imports: [CommonModule, TableProductsComponent, AsyncPipe],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss'
})
export class FinancialProductsPageComponent implements OnInit {


  private productoHttpService = inject(ProductHttpService);

  private router = inject(Router);

  products$: Observable<ProductInterface[]> = new Observable();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productoHttpService.getProducts();
  }

  goToCreateUpdatePage(idProduct?: string) {
    if (idProduct) {
      this.router.navigate(['financial-products', 'update-product', idProduct]);
    } else {
      this.router.navigate(['financial-products', 'create-product']);
    }
  }


  deleteProduct(idProduct: string) {
    console.log('esto vamos a eliminar', idProduct);
  }



}
