import { Routes } from '@angular/router';
import { FinancialProductsPageComponent } from './pages/financial-products-page/financial-products-page.component';
import { CreateUpdateProductPageComponent } from './pages/create-update-product-page/create-update-product-page.component';

export const routes: Routes = [
    {
        path: 'financial-products',
        component: FinancialProductsPageComponent,
    },

    {
        path: 'financial-products/update-product/:id',
        component: CreateUpdateProductPageComponent
    },

    {
        path: 'financial-products/create-product',
        component: CreateUpdateProductPageComponent
    },

    {
        path: '',
        redirectTo: 'financial-products',
        pathMatch: 'full'
    }
];
