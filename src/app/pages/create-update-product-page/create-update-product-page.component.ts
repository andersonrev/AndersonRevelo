import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { ProductInterface, bodyProductUpdate } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { NotificationsToastService } from '../../services/notifications/notifications-toast.service';
import { ProductHttpService } from '../../services/product/product-http.service';

@Component({
  selector: 'app-create-update-product-page',
  standalone: true,
  imports: [FormProductComponent],
  templateUrl: './create-update-product-page.component.html',
  styleUrl: './create-update-product-page.component.scss'
})
export class CreateUpdateProductPageComponent implements OnInit {

  @ViewChild(FormProductComponent) childFormComponent!: FormProductComponent;

  @Input('id')
  id: string = '';

  isEditing = false;

  productEditing: ProductInterface | undefined = undefined;


  notificationService = inject(NotificationsToastService);

  constructor(private productoHttpService: ProductHttpService) {

  }

  ngOnInit(): void {
    if (this.id) {
      this.isEditing = true;
      const products = this.productoHttpService.getProductsStore();
      this.productEditing = products.find(product => product.id === this.id);
    }
  }


  sendBody(body: ProductInterface | bodyProductUpdate) {
    if (this.isEditing && this.productEditing) {
      // llamar al servicio editar
      this.updateProduct(this.productEditing.id, body as ProductInterface);
    } else {
      // llamar al sevicio crear
      this.createProduct(body as ProductInterface);
    }

  }

  createProduct(product: ProductInterface) {
    this.productoHttpService.createProduct(product).subscribe({
      next: (resp: ResponseCreateProductInterface) => {
          this.notificationService.showToast('success','Creado correctamente');
          this.childFormComponent.onReset();
      },
      error: (error) => {
        console.error(error);
        this.notificationService.showToast('error','Error al crear producto');
      }
    })
  }

  updateProduct(id: string, product: ProductInterface) {

    const productBody: Omit<ProductInterface, 'id'> = {
      date_release: product.date_release,
      date_revision: product.date_revision,
      description: product.description,
      logo: product.logo,
      name: product.name
    }

    this.productoHttpService.updateProduct(id, productBody).subscribe({
      next: (resp: ResponseUpdateProductInterface) => {
        this.notificationService.showToast('success','Producto editado correctamente');
      },
      error: (error) => {
        console.error(error);
        this.notificationService.showToast('error', 'Error al editar el producto');
      }
    });
  }



}
