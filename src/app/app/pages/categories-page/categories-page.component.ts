import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) {

  }
  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      })

  }



}
