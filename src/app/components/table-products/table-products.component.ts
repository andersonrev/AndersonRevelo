import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})
export class TableProductsComponent {

  @Input()
  products: ProductInterface[] | null = [];


  
}
