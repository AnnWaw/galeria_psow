import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { RandomImagePageComponent } from './pages/random-image-page/random-image-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';
import { FormsModule } from '@angular/forms';
import { BreedsFilterPipe } from './pipes/breeds-filter.pipe';
import { ModalImageComponent } from './pages/modal-image/modal-image.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RandomImagePageComponent,
    GalleryPageComponent,
    BreedsFilterPipe,
    ModalImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }