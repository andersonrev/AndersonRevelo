import { AsyncPipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from '../../services/product/product-http.service';
import { FooterTableComponent } from '../../shared/footer-table/footer-table.component';
import { NotificationsToastService } from '../../services/notifications/notifications-toast.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-financial-products-page',
  standalone: true,
  imports: [FormsModule, TableProductsComponent, AsyncPipe, FooterTableComponent],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss'
})
export class FinancialProductsPageComponent implements OnInit {

  @ViewChild('modal') modal!: TemplateRef<any>;

  private productoHttpService = inject(ProductHttpService);
  container = inject(ViewContainerRef)
  private router = inject(Router);
  private notificationService =inject(NotificationsToastService);


  products$ = new BehaviorSubject<ProductInterface[]>([]);

  

  search = '';
  totalProducts = 0;


  totalPages = 1;
  currentPage = 1;

  AMOUNT_RECORD_TO_SHOW = 5;


  productoToDelete!: ProductInterface;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productoHttpService.getProducts().subscribe({
      next: (products) => {
        this.products$.next(products.slice(0, this.AMOUNT_RECORD_TO_SHOW));
        this.totalProducts = products.length;
        this.totalPages = Math.ceil(this.totalProducts / this.AMOUNT_RECORD_TO_SHOW)
      },
      error: (e) => {
        // toast
      }
    });
  }

  goToCreateUpdatePage(idProduct?: string): void {
    if (idProduct) {
      this.router.navigate(['financial-products', 'update-product', idProduct]);
    } else {
      this.router.navigate(['financial-products', 'create-product']);
    }
  }


  deleteProduct() {
    // console.log('esto vamos a eliminar', idProduct);
    this.productoHttpService.deleteProduct(this.productoToDelete.id).subscribe({
      next: (resp) => {
        this.notificationService.showToast('success', 'Producto eliminado correctamente')
        this.removeItemFromTable(this.productoToDelete.id);
        this.container.clear();
      },
      error: (e) =>{
        this.notificationService.showToast('error', 'Producto eliminado correctamente')
        this.container.clear();
      }
    })
  }

  removeItemFromTable(id: string){
    const newProducts = this.products$.getValue().filter( itemProd => itemProd.id != id);
    this.productoHttpService.removeProductoFromStore(id);

    this.totalProducts--;
    this.totalPages = Math.ceil(this.totalProducts / this.AMOUNT_RECORD_TO_SHOW);

    if(newProducts.length === 0 && this.currentPage > 1){
      this.currentPage--;
      this.showPreviousAmount(this.AMOUNT_RECORD_TO_SHOW);
      // emitir nuevamente
    }else {
      this.products$.next(newProducts);
    }

  }

  searchInTable(): void {
    if (this.search) {
      const productosFiltered = this.productoHttpService.getProductsStore().filter(product =>
        product.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
      this.products$.next(productosFiltered.slice(0, this.AMOUNT_RECORD_TO_SHOW));
      this.totalProducts = productosFiltered.length;

    } else {
      this.products$.next(this.productoHttpService.getProductsStore().slice(0, this.AMOUNT_RECORD_TO_SHOW));
      this.totalProducts = this.productoHttpService.getProductsStore().length;
    }

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalProducts / this.AMOUNT_RECORD_TO_SHOW);

  }


  showAmountSelected(amount: number): void {
    // si el amount es mayor al numero de registros no hacer nada
    // casoo contrario
    // mostrar solo el numero de registros de amount
    this.AMOUNT_RECORD_TO_SHOW = amount;
    if (amount <= this.totalProducts) {
      const amountOfProductsShow = this.productoHttpService.getProductsStore().slice(0, amount);
      this.products$.next(amountOfProductsShow);
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.totalProducts / amount);
    }

  }

  showNextAmount(amount: number): void {
    // tengo el total
    // saber cuantas paginas tengo ?
    // guardar eso en el estado
    // paginas 3 seleccion 5 ->   quiere decir que tengo 15 elementos
    // y si tengo 12 y quiero mostrar de 5 en 5 12 / 5 = fucnoin techo 
    // tambien tengo que saber en que pagina estoy para segun eso hacer el slice
    // 

    if (this.currentPage < this.totalPages && this.currentPage !== this.totalPages) {

      const productsToShow = this.productoHttpService.getProductsStore().slice(this.currentPage * amount, this.currentPage * amount + amount);

      this.products$.next(productsToShow);

      this.currentPage++;

    }

  }
  showPreviousAmount(amount: number): void {
    // que pasa cuando tenga 2 elementos de 5 que quiero mostrar => estoy en la ultima pagina

    if (this.currentPage <= this.totalPages && this.currentPage !== 1) {

      const indiceFinal = amount * this.currentPage - amount;
      const indiceInicial = indiceFinal - amount;
      const productsToShow = this.productoHttpService.getProductsStore().slice(indiceInicial, indiceFinal);
      this.products$.next(productsToShow);

      this.currentPage--;

    }

  }

  showDeleteModal(product: ProductInterface) {
    this.productoToDelete = product;
    this.container.createEmbeddedView(this.modal, this);
  }


}
