import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableProductsComponent } from '../../components/table-products/table-products.component';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from '../../services/product/product-http.service';
import { FooterTableComponent } from '../../shared/footer-table/footer-table.component';
import { NotificationsToastService } from '../../services/notifications/notifications-toast.service';

@Component({
    selector: 'app-financial-products-page',
    imports: [FormsModule, TableProductsComponent, FooterTableComponent],
    templateUrl: './financial-products-page.component.html',
    styleUrl: './financial-products-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialProductsPageComponent {

  @ViewChild('modal') modal!: TemplateRef<any>;

  container = inject(ViewContainerRef)
  private router = inject(Router);
  private notificationService =inject(NotificationsToastService);
  private productoHttpService = inject(ProductHttpService);




  

  searchTerm = signal('');
  pageSize = signal(5);

  filteredProducts = computed<ProductInterface[]>(() => {
    const products = this.productoHttpService.getProductsStore()
    const search = this.searchTerm().trim().toLowerCase()

    if(!search) {
      return products
    }

    return products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm())
      );
  });

  totalPages = computed(() => {
      const products = this.filteredProducts().length;
      return  Math.ceil(products / this.pageSize());
  });

  currentPage = linkedSignal({
    source: this.totalPages,
    computation: () => 1
  });

  totalRecords = computed(() => {
    return this.filteredProducts().length
  })


  paginatedProducts = computed(() => {
    const products = this.filteredProducts()
    const size = this.pageSize()
    const page = this.currentPage()

    return products.slice((page - 1) * size , page * size)
  })

  productoToDelete!: ProductInterface;


  goToCreateUpdatePage(idProduct?: string): void {
    if (idProduct) {
      this.router.navigate(['financial-products', 'update-product', idProduct]);
    } else {
      this.router.navigate(['financial-products', 'create-product']);
    }
  }


  deleteProduct() {
    this.productoHttpService.deleteProduct(this.productoToDelete.id).subscribe({
      next: () => {
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
    this.productoHttpService.removeProductoFromStore(id);
  }



  showAmountSelected(amount: number): void {
    this.pageSize.set(amount);
  }

  showNextAmount(amount: number): void {


    if (this.currentPage() < this.totalPages()){
      this.currentPage.update(a => a + 1)
    }
  }
  showPreviousAmount(amount: number): void {
    
    if(this.currentPage() > 1){
      this.currentPage.update(a => a - 1)
    }
  }

  showDeleteModal(product: ProductInterface) {
    this.productoToDelete = product;
    this.container.createEmbeddedView(this.modal, this);
  }


}
