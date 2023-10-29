import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { NewProductComponent } from './pages/new-product/new-product.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListUsersComponent,
    NewUserComponent,
    EditUserComponent,
    ListProductsComponent,
    NewProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class AdminModule { }
