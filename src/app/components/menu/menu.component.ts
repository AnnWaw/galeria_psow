import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/models/breed';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  breeds: Breed[] = [];
  filter: string = '';
  isCollapsed: boolean[] = [];
  
  constructor(
    private dogApi: DogApiService
  ){
    
  }
  ngOnInit(): void {
      this.dogApi.getBreeds().subscribe((breeds: Breed[]) => {
        this.breeds = breeds;        
      });
  }

  checkCollapse(index: number):void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
}