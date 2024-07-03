import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderTableComponent } from '../../components/header-table/header-table.component';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from '../../services/product-http.service';
import { ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';

@Component({
  selector: 'app-financial-products-page',
  standalone: true,
  imports: [CommonModule, TableProductsComponent, HeaderTableComponent],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss'
})
export class FinancialProductsPageComponent implements OnInit {


  private productoHttpService = inject(ProductHttpService);
  products$: Observable<ProductInterface[]> = new Observable();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productoHttpService.getProducts();
  }

  updateProduct(product: ProductInterface) {
    const productBody: Omit<ProductInterface, 'id'> = {
      date_release: product.date_release,
      date_revision: product.date_revision,
      description: product.description,
      logo: product.logo,
      name: product.name
    }
    console.log('esto vamos a enivar al service', product);
    this.productoHttpService.updateProduct(product.id, productBody).subscribe({
      next: (resp: ResponseUpdateProductInterface) => {
        console.log(resp);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteProduct(idProduct: string) {
    console.log('esto vamos a eliminar', idProduct);
  }

}
