import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { productsMock } from '../../constants/mock-products';
import { ProductInterface } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { ProductHttpService } from '../../services/product-http.service';
import { FinancialProductsPageComponent } from './financial-products-page.component';

describe('FinancialProductsPageComponent', () => {
  let component: FinancialProductsPageComponent;
  let fixture: ComponentFixture<FinancialProductsPageComponent>;

  const mockUpdateProduct: ProductInterface = {
    id: '1',
    name: 'testUpdate',
    description: 'testDescription',
    logo: 'test.png',
    date_release: new Date('2022-01-01'),
    date_revision: new Date('2023-01-01'),
  }

  const mockedProductHttpService: {
    getProducts: () => Observable<ProductInterface[]>
    createProduct: () => Observable<ResponseCreateProductInterface>
    updateProduct: (id: string, product: ProductInterface) => Observable<ResponseUpdateProductInterface>

  } = {

    getProducts:  () => of(productsMock),
    createProduct: () => of({ message: '', data: productsMock[0] }),
    updateProduct: () => of({ message: '', data: mockUpdateProduct })


  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsPageComponent],
      providers: [{ provide: ProductHttpService, useValue: mockedProductHttpService }]

    })
      .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts, getProducts()', () => {
    const mockGetProducts = spyOn(mockedProductHttpService, 'getProducts');
    component.ngOnInit();
    expect(mockGetProducts).toHaveBeenCalled();
  });

  it('should call updateProduct, updateProduct()', () => {
    const spyUpdateProduct = spyOn(mockedProductHttpService, 'updateProduct');
    spyUpdateProduct.and.returnValue(of({message: '', data: mockUpdateProduct}));
    component.updateProduct(mockUpdateProduct);
    expect(mockedProductHttpService.updateProduct).toHaveBeenCalled();
  });


  it('should call createProduct, createProduct()', () => {
    const spyCreateProduct = spyOn(mockedProductHttpService, 'createProduct');
    spyCreateProduct.and.returnValue(of({message: '', data: mockUpdateProduct}));
    component.createProduct(mockUpdateProduct);
    expect(mockedProductHttpService.createProduct).toHaveBeenCalled();
  });

  // it('should call deleteProduct, delete()', () => {
  //   const spyCreateProduct = spyOn(mockedProductHttpService, 'createProduct');
  //   spyCreateProduct.and.returnValue(of({message: '', data: mockUpdateProduct}));
  //   component.createProduct(mockUpdateProduct);
  //   expect(mockedProductHttpService.createProduct).toHaveBeenCalled();
  // });





});
