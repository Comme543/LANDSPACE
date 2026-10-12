import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  ActivatedRoute
} from '@angular/router';

import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-details',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails {

  property: any = null;

  loading: boolean = true;

  errorMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.loadProperty();

  }


  loadProperty() {

    const id =
      this.route.snapshot.paramMap.get('id');


    console.log('Property ID:', id);


    if (!id) {

      this.loading = false;

      this.errorMessage =
        'Property ID not found.';

      this.changeDetectorRef.detectChanges();

      return;

    }


    this.propertyService
      .getPropertyById(id)
      .subscribe({

        next: (data: any) => {

          console.log(
            'Property received:',
            data
          );


          this.property = data;

          this.loading = false;

          this.errorMessage = '';


          // Force Angular to update the page
          this.changeDetectorRef.detectChanges();

        },


        error: (error) => {

          console.log(
            'Property loading error:',
            error
          );


          this.loading = false;

          this.errorMessage =
            'Unable to load property details.';


          this.changeDetectorRef.detectChanges();

        }

      });

  }

}