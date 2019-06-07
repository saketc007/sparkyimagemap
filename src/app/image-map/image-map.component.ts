
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import {ImageMapModel} from '../model/imagemap.model';
import {ImageMapCoordinate} from '../model/imagemapcoordinate.model';
import {ProductModel} from '../model/product.model';
import {ProductOverviewService} from '../sharedservices/productoverview.service';
import {InterestedProductService} from '../sharedservices/interested.service';

@Component({
  selector: 'image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.scss'],
  
})
export class ImageMapComponent implements OnInit {

  @Input()
  src: string

  //@Input()
  coordinates: ImageMapCoordinate[] = []

  @Input()
  imageMap: ImageMapModel

  @Input()
  canEdit: boolean

  @Output('onClick')
  onClick: EventEmitter<ProductModel> = new EventEmitter();


  constructor(private http: HttpClient, 
              private productOverviewService: ProductOverviewService,
              private interestedService: InterestedProductService) { 
  }

  ngOnInit() { 
    //
    console.log( 'initializing this.imageMap inside the IMAGE MAP component' + this.imageMap.products);
    this.interestedService.initializeProductList(this.imageMap);

    this.src = this.imageMap.imageUrl;
    //loop through all products from an Image Map and COllect all the coordinates into an array.
    for (let sparkyproduct of this.imageMap.products){
      sparkyproduct.coordinates.hybrisId = sparkyproduct.hybrisId;
      this.coordinates.push(sparkyproduct.coordinates);
    }
   }

  getCoordinateStyle(coordinate: ImageMapCoordinate): object {
    return {
      top: `${coordinate.y}px`,
      left: `${coordinate.x}px`,
      height: `${coordinate.h}px`,
      width: `${coordinate.w}px`
    };
  }



  findProduct(coordinate){
    //from the clicked coordinate object, find the product (using the hybrisId)
    for (let sparkyproduct of this.imageMap.products){
      if (sparkyproduct.hybrisId === coordinate.hybrisId){
        return sparkyproduct;
      }
    }
    return ;
  }

  onAreaContext(e: MouseEvent, coordinate: ImageMapCoordinate) {
    if(this.canEdit)
    {
      if(coordinate) {
        console.log('editing')

      }
      else {
        console.log('creating')
      }
    
      e.stopPropagation();
      return false;
    }
  }

  onAreaCreate(x: number, y: number): ImageMapCoordinate {
    //console.log( " on area create");
    const coordinate = new ImageMapCoordinate({x, y, w: 100, h: 100});
    return coordinate
  }

  onAreaEdit(coordinate: ImageMapCoordinate): ImageMapCoordinate {
    return coordinate;
  }

  onAreaClick(coordinate) {
    console.log( " On area click" + coordinate.x);
    //from the clicked coordinate object, find the product (using the hybrisId)
    let product: ProductModel = this.findProduct(coordinate);
    this.interestedService.updateInterestedProductToList(product);
    //this.onClick.emit(product);
  }

  mouseEnter(coordinate){
    let product: ProductModel = this.findProduct(coordinate);
    this.productOverviewService.showProductOverviewComponent(product);
  }
 
  mouseLeave(div : string){
    //console.log('mouse leave :' + div);
    this.productOverviewService.hideProductOverviewComponent();
  }

}


