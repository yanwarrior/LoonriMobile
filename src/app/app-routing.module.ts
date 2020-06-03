import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'product-edit/:id',
    loadChildren: () => import('./pages/product-edit/product-edit.module').then( m => m.ProductEditPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'product-create',
    loadChildren: () => import('./pages/product-create/product-create.module').then( m => m.ProductCreatePageModule),
    canActivate: [GuardService]
  },
  {
    path: 'sign-out',
    loadChildren: () => import('./pages/sign-out/sign-out.module').then( m => m.SignOutPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'etalase',
    loadChildren: () => import('./pages/etalase/etalase.module').then( m => m.EtalasePageModule),
    canActivate: [GuardService]
  },
  {
    path: 'cart-list',
    loadChildren: () => import('./pages/cart-list/cart-list.module').then( m => m.CartListPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'cart-edit/:id',
    loadChildren: () => import('./pages/cart-edit/cart-edit.module').then( m => m.CartEditPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'acceptance-create',
    loadChildren: () => import('./pages/acceptance-create/acceptance-create.module').then( m => m.AcceptanceCreatePageModule),
    canActivate: [GuardService]
  },
  {
    path: 'acceptance-list',
    loadChildren: () => import('./pages/acceptance-list/acceptance-list.module').then( m => m.AcceptanceListPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'acceptance-detail/:id',
    loadChildren: () => import('./pages/acceptance-detail/acceptance-detail.module').then( m => m.AcceptanceDetailPageModule),
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
