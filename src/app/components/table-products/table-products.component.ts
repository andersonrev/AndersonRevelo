import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { DropdownCustomComponent } from '../../shared/dropdown-custom/dropdown-custom.component';
import { SafeImagePipe } from '../../pipes/safe-image.pipe';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [CommonModule, DropdownCustomComponent, DatePipe, SafeImagePipe],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent {


  @Input()
  products: ProductInterface[] | null = [];



  @Output()
  eventUpdateProduct = new EventEmitter<ProductInterface>();

  @Output()
  eventDeleteProduct = new EventEmitter<ProductInterface>();

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
        this.deleteProduct(data);
      }
    },
  ]


  editProduct(product: ProductInterface) {
    this.eventUpdateProduct.emit(product);

  }

  deleteProduct(product: ProductInterface) {
    this.eventDeleteProduct.emit(product);
  }


}
