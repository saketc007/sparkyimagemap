import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../model/product.model';
import {InterestedProductService} from '../sharedservices/interested.service';
import { ImageMapModel } from '../model/imagemap.model';

@Component({
  selector: 'app-interested-products',
  templateUrl: './interested-products.component.html',
  styleUrls: ['./interested-products.component.scss']
})
export class InterestedProductsComponent implements OnInit {
  //component must grab this list from the service. The service is the Single source of truth here.
  interestedProductList : ProductModel[];
  @Input()
  imageMap: ImageMapModel

  buttonText: string;

  constructor(private interestedService: InterestedProductService) { }

  // subscribe to events from the productUpdated event
  ngOnInit() {
    //now any change to that list will be told to me. Right now subscribing to the 'productAdded' event
    this.interestedService.productUpdatedEvent.subscribe(
      (product: ProductModel) => {
      }
    )
  }

  getProductCurrentStyle(product: ProductModel){
    if (product.interested){
      return {
        opacity: 1.0
      };
    }
    else{
      return {
        opacity: 0.5

      };
    }
  }

  toggleInterested(product: ProductModel){
    this.interestedService.toggle(product.hybrisId);
    //console.log(' this is a click');
  }

  onAddToCart(){
    //loop through all the components and add them to the cart....which URL should I invoke ?
    this.interestedService.addAllProductsToCart(this.imageMap.imageUrl)
  }

  countSelectedProducts() {
      return this.interestedService.getProductsForImageMap(this.imageMap.imageUrl).filter(p => p.interested).length;
  }

  isAnyProductSelected(){
    let productList = this.interestedService.getProductsForImageMap(this.imageMap.imageUrl);
    for (let product of productList){
      if (product.interested){
        return true;
      }
    }
    return false;
  }

  getProductsForImageMap(imageMap: ImageMapModel){
    return this.interestedService.getProductsForImageMap(imageMap.imageUrl);
  }
}
