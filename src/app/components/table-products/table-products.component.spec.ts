import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsComponent } from './table-products.component';
import { By } from '@angular/platform-browser';
import { ProductInterface } from '../../interfaces/product.interface';
import { productsMock } from '../../constants/mock-products';

describe('TableProductsComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message', () => {
    component.products = [];
    expect(component.products.length).toEqual(0);
    fixture.detectChanges();
    const pEmpty = fixture.debugElement.query(By.css('#emptyMessage')).nativeElement;
    expect(pEmpty.innerHTML).toContain('There are no products.');
  });
  it('should emit eventUpdateProduct when editProduct is called', () => {
    const product: ProductInterface = productsMock[0];
    spyOn(component.eventUpdateProduct, 'emit');

    component.editProduct(product);

    expect(component.eventUpdateProduct.emit).toHaveBeenCalledWith(product);
  });

  it('should emit eventDeleteProduct when deleteProduct is called', () => {

    const product: ProductInterface = productsMock[0];
    spyOn(component.eventDeleteProduct, 'emit');

    component.deleteProduct(product);

    expect(component.eventDeleteProduct.emit).toHaveBeenCalledWith(product);
  });
});
