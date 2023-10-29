import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LayoutAppComponent } from './layout/layout-app/layout-app.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';


@NgModule({
  declarations: [
    LayoutAppComponent,
    HomePageComponent,
    ServicesPageComponent,
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class AppModule { }
