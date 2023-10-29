import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
