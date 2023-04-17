import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogApiService } from 'src/app/services/dog-api.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit, OnDestroy{

  private paramSubscription: Subscription | undefined;
  dogImageUrl:string[] = [];
  breedName:string = '';
  subBreed:string = '';
  selectedImageUrl: string = '';
  @ViewChild('imageModal', { static: false }) imageModal!: ElementRef;
  currentPage = 1;
  itemsPerPage = 20;
  maxSize = 3
  Math = Math;
  isLoading = true;
  isExtraSmallScreen = false;
  isSmallScreen = false;
  isMediumScreen = false;
  isLargeScreen = false;
  isExtraLargeScreen = false;

  constructor(private activatedRoute: ActivatedRoute, private dogApi: DogApiService, private router: Router){}

  ngOnInit(): void {
      this.paramSubscription = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
       this.updateScreenSize();
        if (paramMap.has("subbreed")){
          this.breedName = paramMap.get('breed') as string;
          this.subBreed = paramMap.get('subbreed') as string;

          // wyświetla galerię podrasy
   
          this.dogApi.getSubBreedImages(this.breedName, this.subBreed).subscribe(
            (imageUrls: string[]) => {
              this.dogImageUrl = imageUrls;
              this.isLoading = false;
            }
          );
        }
        if (paramMap.has("breed")){
          this.breedName = paramMap.get('breed') as string;
          // wyświetla galerię rasy
          this.dogApi.getBreedImages(this.breedName).subscribe((imageUrls: string[]) => {
            this.dogImageUrl = imageUrls;
            this.isLoading = false;
          });
        }
      });

      this.activatedRoute.queryParamMap.subscribe((queryParamMap: ParamMap) => {
        const page = queryParamMap.get('page');
        if (page) {
          this.currentPage = parseInt(page, 10);
        }
      });
      
      
  }

  ngOnDestroy(): void {
      if (this.paramSubscription){
        this.paramSubscription.unsubscribe();
      }
  }

  openModal(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    this.imageModal.nativeElement.classList.add('show');
    this.imageModal.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.imageModal.nativeElement.classList.remove('show');
    this.imageModal.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  changePage(pageNumber: number): void {
    this.isLoading = true;
    this.currentPage = pageNumber;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge',
    });
    if (this.subBreed) {
      this.dogApi.getSubBreedImages(this.breedName, this.subBreed).subscribe(
        (imageUrls: string[]) => {
          this.dogImageUrl = imageUrls;
          this.isLoading = false;
        }
      );
    } else {
      this.dogApi.getBreedImages(this.breedName).subscribe((imageUrls: string[]) => {
        this.dogImageUrl = imageUrls;
        this.isLoading = false;
      });
    }
  }

  @HostListener('window:resize')
  updateScreenSize() {
    const screenWidth = window.innerWidth;

    this.isExtraSmallScreen = screenWidth < 576;
    this.isSmallScreen = screenWidth >= 576 && screenWidth < 768;
    this.isMediumScreen = screenWidth >= 768 && screenWidth < 992;
    this.isLargeScreen = screenWidth >= 992 && screenWidth < 1200;
    this.isExtraLargeScreen = screenWidth >= 1200;
  }
}