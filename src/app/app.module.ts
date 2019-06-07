import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { StorefrontModule } from "@spartacus/storefront";
import { translations } from '@spartacus/storefront';
import { defaultCmsContentConfig } from '@spartacus/storefront';
import { ConfigModule } from '@spartacus/core';
import { ImageMapComponent } from './image-map/image-map.component';
import {HttpClientModule} from '@angular/common/http';
import { InterestedProductsComponent } from './interested-products/interested-products.component';
import {InterestedProductService} from './sharedservices/interested.service';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ImageMapService } from './sharedservices/imagemap.service';



@NgModule({
  declarations: [
    AppComponent,
    ImageMapComponent,
    InterestedProductsComponent,
    ProductOverviewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    StorefrontModule.withConfig({
        backend: {
          occ: {
            baseUrl: 'https://localhost:9002',
            prefix: '/rest/v2/'
          }
        },
        authentication: {
          client_id: 'mobile_android',
          client_secret: 'secret'
        },
        site: {
          baseSite: 'electronics'
        },
        i18n: {
          resources: translations
        }
      }),
      ConfigModule.withConfigFactory(defaultCmsContentConfig)
    ],
  providers: [InterestedProductService, ImageMapService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }