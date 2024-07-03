import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProductPageComponent } from './create-update-product-page.component';
import { Observable, of } from 'rxjs';
import { productsMock } from '../../constants/mock-products';
import { ProductInterface } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { ProductHttpService } from '../../services/product-http.service';
import { ActivatedRoute } from '@angular/router';

describe('CreateUpdateProductPageComponent', () => {
  let component: CreateUpdateProductPageComponent;
  let fixture: ComponentFixture<CreateUpdateProductPageComponent>;

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

    getProducts: () => of(productsMock),
    createProduct: () => of({ message: '', data: productsMock[0] }),
    updateProduct: () => of({ message: '', data: mockUpdateProduct })


  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateProductPageComponent],
      providers: [{ provide: ProductHttpService, useValue: mockedProductHttpService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call updateProduct, updateProduct()', () => {
    const spyUpdateProduct = spyOn(mockedProductHttpService, 'updateProduct');
    spyUpdateProduct.and.returnValue(of({ message: '', data: mockUpdateProduct }));
    component.updateProduct(mockUpdateProduct);
    expect(mockedProductHttpService.updateProduct).toHaveBeenCalled();
  });


  xit('should call createProduct, createProduct()', () => {
    const spyCreateProduct = spyOn(mockedProductHttpService, 'createProduct');
    spyCreateProduct.and.returnValue(of({ message: '', data: mockUpdateProduct }));
    component.createProduct(mockUpdateProduct);
    expect(mockedProductHttpService.createProduct).toHaveBeenCalled();
  });
});
