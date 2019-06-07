import {ProductModel} from '../model/product.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ImageMapModel } from '../model/imagemap.model';
import { CartService } from '@spartacus/core';
//import { ImageMapService } from './imagemap.service';

@Injectable()
export class InterestedProductService{

  productUpdatedEvent = new EventEmitter<ProductModel>();
  initializedEvent = new EventEmitter<ProductModel[]>();

  interestedProducts : ProductModel[] = [];


  constructor(private cartService :CartService){
  }

  initializeProductList(imageMap: ImageMapModel){
    //this has to change...need more help here
    console.log( 'the list of prodiucts' + imageMap.products);
    
    this.interestedProducts 
    for ( let product of  imageMap.products ){
      product.interested = true;
      product.imageUrl = imageMap.imageUrl;
    }
    //product id and image url
    //add only products that are required to be added 
    for ( let product of imageMap.products){
      let foundIndex = this.interestedProducts.map(i => i.hybrisId).indexOf(product.hybrisId);
      if (foundIndex === -1 ){
        this.interestedProducts.push(product);
      }
    }
  
  }

  updateInterestedProductToList(product: ProductModel){
    //update the list
    //check if it is already there.
    const foundIndex = this.interestedProducts.map(i => i.hybrisId).indexOf(product.hybrisId);
    this.toggleInterested(foundIndex, product)
    //To all the listeners out there....
    this.productUpdatedEvent.emit(product);
  }

  toggle(productId: string ){
    const foundIndex = this.interestedProducts.map(i => i.hybrisId).indexOf(productId);
    //console.log('toggled' + productId);
    this.toggleInterested(foundIndex, null)
  }

  toggleInterested( foundIndex: number, product: ProductModel){
    if (foundIndex > -1){
      //this.interestedProducts.push(product);
      this.interestedProducts[foundIndex].interested = !this.interestedProducts[foundIndex].interested;
    }
  }
  
  //add All products to the cart
  addAllProductsToCart( imageMapUrl: string){
    //currently only single add to cart is working
    for ( let product of  this.getProductsForImageMap(imageMapUrl) ){
         if(product.interested){
           console.log('add', product.hybrisId);
           this.cartService.addEntry(product.hybrisId,1);
           
         }
        }
    
  }

  getProductsForImageMap( imageUrl: string){
    return this.interestedProducts.filter( x => x.imageUrl === imageUrl);
  }

}