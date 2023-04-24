import { Pipe, PipeTransform } from '@angular/core';
import { Breed } from '../models/breed';

@Pipe({
  name: 'breedsFilter',
})
export class BreedsFilterPipe implements PipeTransform {
  transform(value: Breed[], name: string): Breed[] {
    const breeds: Breed[] = [];

    value.forEach((breed) => {
      if (breed.breedName.includes(name)) {
        breeds.push(breed);
      } else {
        const filteredSubBreed = breed.subBreeds.filter((subBreed) => {
          return subBreed.includes(name);
        });
        if (filteredSubBreed.length > 0) {
          breeds.push({
            breedName: breed.breedName,
            subBreeds: filteredSubBreed,
          });
        }
      }
    });
    return breeds;
  }
}
