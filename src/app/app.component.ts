import { Component, OnInit } from '@angular/core';
import { HttpClientModule , HttpClient} from '@angular/common/http';

//all the model classes
import {ImageMapModel} from './model/imagemap.model';
import { ProductModel } from './model/product.model';
import {ImageMapCoordinate} from "./model/imagemapcoordinate.model";

//all the service classes
//import {InterestedProductService} from './sharedservices/interested.service';
import {ImageMapService} from './sharedservices/imagemap.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
 
})
export class AppComponent implements  OnInit  {
  title = 'Sparky-store';
  imageMaps : ImageMapModel[];
  // image: string = 'https://image.shutterstock.com/image-vector/solar-system-sun-planets-vector-260nw-751091653.jpg'
  showImage: boolean

  constructor(private http: HttpClient, 
              private imageMapService: ImageMapService) { 
  }

  //invoke the sparky cluster. Can this be made a property ?
  ngOnInit() { 
    this.http.get("https://sparky.hack3.cluster.extend.cx.cloud.sap/imagemaps").subscribe(
      ( 
        (imageMaps : ImageMapModel[]) => {
            this.imageMaps = imageMaps;
            this.imageMapService.initializeAllImageMaps(this.imageMaps)
            console.log(this.imageMaps);
        } 
      
      ));
   }

   getClick(product: ProductModel) {
    //Tell the service that a new product is added.
    //this.interestedService.updateInterestedProductToList(product);
  }

}
