import { Component, Input, OnInit, inject } from '@angular/core';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { ProductInterface, bodyProductUpdate } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { ProductHttpService } from '../../services/product/product-http.service';
import { NotificationsToastService } from '../../services/notifications/notifications-toast.service';

@Component({
  selector: 'app-create-update-product-page',
  standalone: true,
  imports: [FormProductComponent],
  templateUrl: './create-update-product-page.component.html',
  styleUrl: './create-update-product-page.component.scss'
})
export class CreateUpdateProductPageComponent implements OnInit {

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
      const products = this.productoHttpService.getProductsStore;
      this.productEditing = products.find(product => product.id === this.id);
    }
  }

  setFormWithData(product: ProductInterface) {

  }


  sendBody(body: ProductInterface | bodyProductUpdate) {
    if (this.isEditing && this.productEditing) {
      // llamar al servicio editar
      this.productoHttpService.updateProduct(this.productEditing.id, body).subscribe({
        next: (resp: ResponseUpdateProductInterface) => {
          console.log(resp);

        },
        error: (e) => {
          console.error(e);
        }
      });
    } else {
      // llamar al sevicio crear

      this.productoHttpService.createProduct(body as ProductInterface).subscribe({
        next: (resp: ResponseUpdateProductInterface) => {
          console.log(resp);
          this.notificationService.showToast('Creado correctamente');
        },
        error: (e) => {
          console.error(e);
        }
      });

    }

  }

  createProduct(product: ProductInterface) {
    this.productoHttpService.createProduct(product).subscribe({
      next: (resp: ResponseCreateProductInterface) => {
        console.log(resp);
      },
      error: (error) => {
        console.error(error);
      }
    })
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
  abrirToast() {
    this.notificationService.showToast('algo como esto se debe ver bien');
  }


}
