import { Component, OnInit } from '@angular/core';
import { ProductOverviewService } from '../sharedservices/productoverview.service';
import { ProductModel } from '../model/product.model';


@Component({
 selector: 'app-product-overview',
 templateUrl: './product-overview.component.html',
 styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

 show: boolean = false
 overviewOfProduct : ProductModel
 

 constructor(private productOverviewService: ProductOverviewService) { }

 ngOnInit() {
   this.productOverviewService.showProductEvent.subscribe(
     (product: ProductModel) => {
      this.overviewOfProduct = product;
     }
   )
 }

}