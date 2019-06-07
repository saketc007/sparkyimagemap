import {ProductModel} from '../model/product.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ImageMapModel } from '../model/imagemap.model';

@Injectable()
export class ImageMapService{

  imageMaps: ImageMapModel[]

  initializeAllImageMaps(imageMaps: import("../model/imagemap.model").ImageMapModel[]) {
    this.imageMaps = imageMaps;
  }

}