import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent {

  @ViewChild('hamburgerMenu') 
  public hamburgerMenu!: ElementRef;

  public toogleSidebar (): void {
    document.body.classList.toggle('toggle-sidebar');
  }

}
