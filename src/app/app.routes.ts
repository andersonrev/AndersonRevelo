import { Routes } from '@angular/router';
import { FinancialProductsPageComponent } from './pages/financial-products-page/financial-products-page.component';

export const routes: Routes = [
    {
        path: 'financial-products',
        component: FinancialProductsPageComponent,
    },
    {
        path: '',
        redirectTo: 'financial-products',
        pathMatch: 'full'
    }
];
