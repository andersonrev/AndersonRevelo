import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { productsMock } from '../../constants/mock-products';
import { ProductInterface } from '../../interfaces/product.interface';
import { ResponseCreateProductInterface } from '../../interfaces/response-create-product.interface';
import { ProductHttpService } from '../../services/product/product-http.service';
import { FinancialProductsPageComponent } from './financial-products-page.component';

describe('FinancialProductsPageComponent', () => {
  let component: FinancialProductsPageComponent;
  let fixture: ComponentFixture<FinancialProductsPageComponent>;
  let router: Router;

  const mockedProductHttpService: {
    getProducts: () => Observable<ProductInterface[]>
    createProduct: () => Observable<ResponseCreateProductInterface>
    getProductsStore: () => ProductInterface[]
  } = {
    getProducts: () => of(productsMock),
    createProduct: () => of({ message: '', data: productsMock[0] }),
    getProductsStore: () => productsMock
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsPageComponent, RouterTestingModule],
      providers: [{ provide: ProductHttpService, useValue: mockedProductHttpService }, provideHttpClientTesting]

    })
      .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts, getProducts()', () => {
    const mockGetProducts = spyOn(mockedProductHttpService, 'getProducts').and.callFake(() => of([]));
    component.ngOnInit();
    expect(mockGetProducts).toHaveBeenCalled();
  });

  it('should navigate to update-product page with id', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const idProduct = '123';
    component.goToCreateUpdatePage(idProduct);

    expect(navigateSpy).toHaveBeenCalledWith(['financial-products', 'update-product', idProduct]);
  });

  it('should navigate to create-product page without id', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToCreateUpdatePage();

    expect(navigateSpy).toHaveBeenCalledWith(['financial-products', 'create-product']);
  });

  it('should call getProductsStore when there is a value in search', () => {
    const mockGetProducts = spyOn(mockedProductHttpService, 'getProductsStore').and.returnValue(productsMock);
    component.search = '1';

    component.searchInTable();

    expect(mockGetProducts).toHaveBeenCalled();
    expect(component.currentPage).toEqual(1);
    const totalProductsWithSearh = productsMock.filter(product =>
      product.name.toLocaleLowerCase().includes(component.search.toLocaleLowerCase()));
    expect(component.totalProducts).toEqual(totalProductsWithSearh.length)
  });

  it('should set current page equal 1', () => {
    // const mockGetProducts = spyOn(mockedProductHttpService, 'getProductsStore').and.returnValue(productsMock);
    const amountAux = 10;
    component.showAmountSelected(amountAux);
    expect(component.currentPage).toEqual(1);

  });

  it('should be 1 when the amount is selected', () => {
    // const mockGetProducts = spyOn(mockedProductHttpService, 'getProductsStore').and.returnValue(productsMock);
    const amountAux = 10;
    component.showAmountSelected(amountAux);
    expect(component.currentPage).toEqual(1);

  });

  it('should be 2 when you advance to the next page.', () => {
    component.showNextAmount(5);
    expect(component.currentPage).toEqual(2);
  });

  it('should be 1 when you advance to the next page and then return', () => {
    component.showNextAmount(5);
    expect(component.currentPage).toEqual(2);
    component.showPreviousAmount(5);
    expect(component.currentPage).toEqual(1);
  });





});





