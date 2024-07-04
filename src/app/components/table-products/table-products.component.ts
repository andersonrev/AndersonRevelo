import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { DropdownCustomComponent } from '../../shared/dropdown-custom/dropdown-custom.component';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [CommonModule, DropdownCustomComponent, DatePipe],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent {


  @Input()
  products: ProductInterface[] | null = [];

  @Input()
  totalRecords = 0;

  @Output()
  eventUpdateProduct = new EventEmitter<ProductInterface>();

  @Output()
  eventDeleteProduct = new EventEmitter<string>();

  itemsDropdown: { label: string, command: (data: any) => void }[] = [
    {
      label: 'EDITAR',
      command: (data) => {
        this.editProduct(data);
      }
    },

    {
      label: 'ELIMINAR',
      command: (data) => {
        this.deleteProduct(data.id);
      }
    },
  ]


  editProduct(product: ProductInterface) {
    console.log('edita el producto', product);
    this.eventUpdateProduct.emit(product);

  }

  deleteProduct(productID: string) {
    console.log('eliminar el producto', productID);
    this.eventDeleteProduct.emit(productID);
  }


}
