import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-random-image',
  templateUrl: './random-image-page.component.html',
  styleUrls: ['./random-image-page.component.css'],
})
export class RandomImagePageComponent implements OnInit {
  
  dogImageUrl:string = '';
  @ViewChild('imageModal', { static: false }) imageModal!: ElementRef;
  // @ViewChild('modalBackdrop', { static: false }) modalBackdrop!: ElementRef;
  
  constructor(private dogApi: DogApiService) {}
  
  getDogImage(){
    this.dogApi.getRandomImage().subscribe((imageUrl: string) => {
      this.dogImageUrl = imageUrl
    });
  }
  
  
  ngOnInit(): void {
    this.getDogImage()
  }

  openModal(dogImageUrl: string): void {
    this.dogImageUrl = dogImageUrl;
    this.imageModal.nativeElement.classList.add('show');
    this.imageModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.imageModal.nativeElement.classList.remove('show');
    this.imageModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}