import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BreedsResponse } from '../models/breeds-response';
import { Observable, map } from 'rxjs';
import { Breed } from '../models/breed';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  readonly baseUrl:string = 'https://dog.ceo/api/'

  constructor(private httpClient: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
    return this.httpClient
      .get<BreedsResponse<Record<string, string[]>>>(`${this.baseUrl}breeds/list/all`)
      .pipe(
        map((response: BreedsResponse<Record<string, string[]>>) => {
          let breeds: Breed[] = [];

          for (let key in response.message) {
            breeds.push({
              breedName: key,
              subBreeds: response.message[key],
            });
          }
          return breeds;
        })
      );
  }

  getBreedImages(breed: string): Observable<string[]> {
    return this.httpClient
      .get<BreedsResponse<string[]>>(`${this.baseUrl}breed/${breed}/images`)
      .pipe(
        map((response: BreedsResponse<string[]>) => response.message)
      );
  }
  getSubBreedImages(breed: string, subBreed: string): Observable<string[]> {
    if (!subBreed){
      return this.getBreedImages(breed);
    }
    return this.httpClient
      .get<BreedsResponse<string[]>>(`${this.baseUrl}breed/${breed}/${subBreed}/images`)
      .pipe(
        map((response: BreedsResponse<string[]>) => response.message)
      );
  }
  getRandomImage(): Observable<string> {
    return this.httpClient
    .get<BreedsResponse<string>>(`${this.baseUrl}breeds/image/random`)
    .pipe(
      map((response: BreedsResponse<string>) => response.message)
    );
  }
}
