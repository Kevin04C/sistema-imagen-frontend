import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from '../shared/layout/layout-admin/layout-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: 'list-users', component: ListUsersComponent },
      { path: 'user/:id', component: EditUserComponent },
      { path: 'list-products', component: ListProductsComponent },
      { path: '**', redirectTo: '' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
