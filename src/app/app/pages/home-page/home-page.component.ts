import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from 'src/app/shared/models/Product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  public products: Product[] = [];

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(
        (products) => {
          this.products = products;
        });

  }
}
