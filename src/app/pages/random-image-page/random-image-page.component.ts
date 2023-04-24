import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DogApiService } from 'src/app/services/dog-api.service';
import { ModalImageComponent } from '../modal-image/modal-image.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-random-image',
  templateUrl: './random-image-page.component.html',
  styleUrls: ['./random-image-page.component.css'],
})
export class RandomImagePageComponent implements OnInit {
  
  dogImageUrl:string = '';
  selectedImageUrl!: string;
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  // @ViewChild('imageModal', { static: false }) imageModal!: ElementRef;
  // @ViewChild('modalBackdrop', { static: false }) modalBackdrop!: ElementRef;
  
  constructor(private dogApi: DogApiService, private modalService: NgbModal) {}
  
  getDogImage(){
    this.dogApi.getRandomImage().subscribe((imageUrl: string) => {
      this.dogImageUrl = imageUrl
    });
  }
  
  ngOnInit(): void {
    this.getDogImage()
  }

  openModal(dogImageUrl: string) {
    this.selectedImageUrl = dogImageUrl;
    const modalRef = this.modalService.open(ModalImageComponent, { backdrop: 'static' });
    modalRef.componentInstance.dogImageUrl = dogImageUrl;
    modalRef.componentInstance.activeModal = modalRef;
  }
}