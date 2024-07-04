import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHttpService } from '../../services/product/product-http.service';
import { FinancialProductsPageComponent } from './financial-products-page.component';
import { Observable, of } from 'rxjs';
import { productsMock } from '../../constants/mock-products';
import { ProductInterface } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FinancialProductsPageComponent', () => {
  let component: FinancialProductsPageComponent;
  let fixture: ComponentFixture<FinancialProductsPageComponent>;


  const mockedProductHttpService: {
    getProducts: () => Observable<ProductInterface[]>
    createProduct: () => Observable<ResponseCreateProductInterface>
  } = {
    getProducts: () => of(productsMock),
    createProduct: () => of({ message: '', data: productsMock[0] }),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsPageComponent],
      providers: [{ provide: ProductHttpService, useValue: mockedProductHttpService }, provideHttpClientTesting]

    })
      .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call getProducts, getProducts()', () => {
    const mockGetProducts = spyOn(mockedProductHttpService, 'getProducts');
    component.ngOnInit();
    expect(mockGetProducts).toHaveBeenCalled();
  });


  // it('should call deleteProduct, delete()', () => {
  //   const spyCreateProduct = spyOn(mockedProductHttpService, 'createProduct');
  //   spyCreateProduct.and.returnValue(of({message: '', data: mockUpdateProduct}));
  //   component.createProduct(mockUpdateProduct);
  //   expect(mockedProductHttpService.createProduct).toHaveBeenCalled();
  // });





});
