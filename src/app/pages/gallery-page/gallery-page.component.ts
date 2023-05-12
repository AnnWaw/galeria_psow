import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DogApiService } from '../../services/dog-api.service';
import { ModalImageComponent } from '../modal-image/modal-image.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css'],
})
export class GalleryPageComponent implements OnInit, OnDestroy {
  private paramSubscription: Subscription | undefined;
  dogImageUrl: string[] = [];
  breedName: string = '';
  subBreed: string = '';
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  currentPage = 1;
  itemsPerPage = 20;
  maxSize = 2;
  Math = Math;
  selectedImageUrl!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dogApi: DogApiService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initializeCurrentPage();
  
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.breedName = paramMap.get('breed') as string;
        if (paramMap.has('subbreed')) {
          this.subBreed = paramMap.get('subbreed') as string;
        } else {
          this.subBreed = '';
        }
        this.dogApi
          .getSubBreedImages(this.breedName, this.subBreed)
          .subscribe((imageUrls: string[]) => {
            this.dogImageUrl = imageUrls;
          });
  
        this.activatedRoute.queryParamMap.subscribe((queryParamMap: ParamMap) => {
          const page = queryParamMap.get('page');
          const storedPage = localStorage.getItem('currentPage');
          const previousBreed = localStorage.getItem('previousBreed');
          const previousSubBreed = localStorage.getItem('previousSubBreed');
  
          if (
            this.breedName !== previousBreed ||
            this.subBreed !== previousSubBreed
          ) {
            this.currentPage = 1;
          } else if (page) {
            this.currentPage = parseInt(page, 10);
          } else if (storedPage) {
            this.currentPage = parseInt(storedPage, 10);
          } else {
            this.currentPage = 1;
          }
  
          this.changePage(this.currentPage);
  
          localStorage.setItem('previousBreed', this.breedName);
          localStorage.setItem('previousSubBreed', this.subBreed);
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  initializeCurrentPage(): void {
    const storedPage = localStorage.getItem('currentPage');
    console.log(`initializeCurrentPage storedPage ${storedPage}`);

    this.currentPage = storedPage ? parseInt(storedPage, 10) : 1;
    console.log(`initializeCurrentPage this.currentPage ${this.currentPage}`);
  }

  openModal(dogImageUrl: string) {
    this.selectedImageUrl = dogImageUrl;
    const modalRef = this.modalService.open(ModalImageComponent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.dogImageUrl = dogImageUrl;
    modalRef.componentInstance.activeModal = modalRef;
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    localStorage.setItem('currentPage', pageNumber.toString()); // zapisz numer strony do LocalStorage
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge',
    });
  }
}
