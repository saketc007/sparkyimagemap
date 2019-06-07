import { Injectable } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { ProductModel } from '../model/product.model';

@Injectable({
 providedIn: 'root'
})
export class ProductOverviewService {

 productOverviewComponentVisibile: boolean = false;
 showProductEvent = new Subject<ProductModel>();


 constructor() { }

 showProductOverviewComponent(product: ProductModel) {
   //this can be used to decided to show ..
   this.productOverviewComponentVisibile = true;
   
   //tell all listeners a product is to be shown....
   this.showProductEvent.next(product);
 }

 hideProductOverviewComponent() {
   this.productOverviewComponentVisibile = false;
 }

 shouldWeShowProductOverviewComponent() : Observable<boolean>{
   return of(this.productOverviewComponentVisibile);
 }
}