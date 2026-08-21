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
export class FinancialProductsPageComponent implements OnInit {

  @ViewChild('modal') modal!: TemplateRef<any>;

  private productoHttpService = inject(ProductHttpService);
  container = inject(ViewContainerRef)
  private router = inject(Router);
  private notificationService =inject(NotificationsToastService);


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

  totalRecords = computed(() => {
    return this.filteredProducts().length
  })

  

  searchTerm = signal('');
  pageSize = signal(5);

  totalPages = computed(() => {
      const products = this.filteredProducts().length;
      return  Math.ceil(products / this.pageSize());
  });

  currentPage = linkedSignal({
    source: this.totalPages,
    computation: () => 1
  });


  paginatedProducts = computed(() => {
    const products = this.filteredProducts()
    const size = this.pageSize()
    const page = this.currentPage()

    return products.slice((page - 1) * size , page * size)
  })



  // totalProductsByFilter = signal<number>(0);



  // numberRecordsDisplayPage = 5;


  productoToDelete!: ProductInterface;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productoHttpService.getProducts().subscribe({
      next: (products) => {
        // this.filteredProducts.set(products.slice(0, this.numberRecordsDisplayPage));
        // this.totalProductsByFilter.set(products.length);
        // this.totalPages = Math.ceil(this.totalProductsByFilter() / this.numberRecordsDisplayPage)
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
    // const newProducts = this.filteredProducts().filter( itemProd => itemProd.id != id);
    this.productoHttpService.removeProductoFromStore(id);

    // this.totalProductsByFilter.update( t => t--);
    // this.totalPages = Math.ceil(this.totalProductsByFilter() / this.numberRecordsDisplayPage);

    // if(newProducts.length === 0 && this.currentPage > 1){

      // this.currentPage()--;
      // this.showPreviousAmount(this.numberRecordsDisplayPage);
    //   // emitir nuevamente
    // }else {
    //   this.productsToDisplay.set(newProducts);
    // }

  }

  searchInTable(): void {
    // if (this.searchTerm) {
      // const productosFiltered = this.productoHttpService.getProductsStore().filter(product =>
      //   product.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase())
      // );
      // this.filteredProducts.set(productosFiltered.slice(0, this.numberRecordsDisplayPage));
      // this.totalProductsByFilter.set(productosFiltered.length);

    // } else {
      // this.filteredProducts.set(this.productoHttpService.getProductsStore().slice(0, this.numberRecordsDisplayPage));
      // this.totalProductsByFilter.set(this.productoHttpService.getProductsStore().length);
    // }

    // this.currentPage = 1;
    // this.totalPages = Math.ceil(this.totalProductsByFilter() / this.numberRecordsDisplayPage);

  }


  showAmountSelected(amount: number): void {
    this.pageSize.set(amount);
    // si el amount es mayor al numero de registros no hacer nada
    // casoo contrario
    // mostrar solo el numero de registros de amount
    // this.numberRecordsDisplayPage = amount;
    // if (amount <= this.totalProductsByFilter()) {
      // const amountOfProductsShow = this.productoHttpService.getProductsStore().slice(0, amount);
      // this.filteredProducts.set(amountOfProductsShow);
      // this.currentPage = 1;
      // this.totalPages = Math.ceil(this.totalProductsByFilter() / amount);
    // }

  }

  showNextAmount(amount: number): void {

    console.log({total:this.totalPages(), actual: this.currentPage()})

    if (this.currentPage() < this.totalPages()){
      this.currentPage.update(a => a + 1)
    }
    // tengo el total
    // saber cuantas paginas tengo ?
    // guardar eso en el estado
    // paginas 3 seleccion 5 ->   quiere decir que tengo 15 elementos
    // y si tengo 12 y quiero mostrar de 5 en 5 12 / 5 = fucnoin techo 
    // tambien tengo que saber en que pagina estoy para segun eso hacer el slice
    // 

    // if (this.currentPage < this.totalPages && this.currentPage !== this.totalPages) {

    //   const productsToShow = this.productoHttpService.getProductsStore().slice(this.currentPage * amount, this.currentPage * amount + amount);

    //   this.productsToDisplay.set(productsToShow);

    //   this.currentPage++;

    // }

  }
  showPreviousAmount(amount: number): void {
    
    if(this.currentPage() > 1){
      this.currentPage.update(a => a - 1)
    }

    // que pasa cuando tenga 2 elementos de 5 que quiero mostrar => estoy en la ultima pagina

    // if (this.currentPage <= this.totalPages && this.currentPage !== 1) {

    //   const indiceFinal = amount * this.currentPage - amount;
    //   const indiceInicial = indiceFinal - amount;
    //   const productsToShow = this.productoHttpService.getProductsStore().slice(indiceInicial, indiceFinal);
    //   this.productsToDisplay.set(productsToShow);

    //   this.currentPage--;

    // }

  }

  showDeleteModal(product: ProductInterface) {
    this.productoToDelete = product;
    this.container.createEmbeddedView(this.modal, this);
  }


}
