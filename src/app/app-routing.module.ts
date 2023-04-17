import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomImagePageComponent } from './pages/random-image-page/random-image-page.component';
import { GalleryPageComponent } from './pages/gallery-page/gallery-page.component';

const routes: Routes = [
  {path: '',
  pathMatch: 'full',
  component: RandomImagePageComponent
  },
  {path: 'gallery/:breed/:subbreed', 
  component: GalleryPageComponent},
  {path: 'gallery/:breed', 
  component: GalleryPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
