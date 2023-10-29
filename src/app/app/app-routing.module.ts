import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAppComponent } from './layout/layout-app/layout-app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAppComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'categories', component: CategoriesPageComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
