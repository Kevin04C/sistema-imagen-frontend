import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

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
