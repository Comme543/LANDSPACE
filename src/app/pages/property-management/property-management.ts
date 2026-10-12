import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  PropertyService
} from '../../services/property.service';

@Component({
  selector: 'app-property-management',

  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],

  templateUrl: './property-management.html',

  styleUrl: './property-management.css'
})
export class PropertyManagement {

  properties: any[] = [];

  filteredProperties: any[] = [];

  searchText: string = '';

  selectedType: string =
    'All Properties';

  selectedStatus: string =
    'All Status';


  constructor(
    private router: Router,

    private propertyService:
      PropertyService,

    private changeDetectorRef:
      ChangeDetectorRef
  ) {

    this.loadProperties();

  }


  // LOAD ALL PROPERTIES

  loadProperties() {

    this.propertyService
      .getProperties()
      .subscribe({

        next: (data: any[]) => {

          this.properties = data;

          // Show all properties immediately
          this.filteredProperties = [
            ...this.properties
          ];

          // Force screen update
          this.changeDetectorRef
            .detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading properties:',
            error
          );

          this.properties = [];

          this.filteredProperties = [];

          this.changeDetectorRef
            .detectChanges();

          alert(
            'Unable to load properties from backend.'
          );

        }

      });

  }


  // SEARCH + FILTER

  searchProperties() {

    const search =
      this.searchText
        .toLowerCase()
        .trim();


    this.filteredProperties =
      this.properties.filter(
        (property: any) => {

          const propertyName =
            property.propertyName
              ?.toLowerCase() || '';


          const ownerName =
            property.ownerName
              ?.toLowerCase() || '';


          const location =
            property.location
              ?.toLowerCase() || '';


          const type =
            property.propertyType
              ?.toLowerCase() || '';


          const selectedType =
            this.selectedType
              .toLowerCase();


          const typeMatch =
            this.selectedType ===
              'All Properties'
            ||
            type === selectedType;


          const selectedStatus =
            this.selectedStatus
              .toLowerCase();


          const propertyStatus =
            this.getStatus(property)
              .toLowerCase();


          const statusMatch =
            this.selectedStatus ===
              'All Status'
            ||
            propertyStatus ===
              selectedStatus;


          const searchMatch =
            !search
            ||
            propertyName.includes(search)
            ||
            ownerName.includes(search)
            ||
            location.includes(search);


          return (
            searchMatch &&
            typeMatch &&
            statusMatch
          );

        }
      );


    this.changeDetectorRef
      .detectChanges();

  }


  // GET STATUS

  getStatus(property: any): string {

    return property.status ||
      'Verified';

  }


  // CLEAR FILTERS

  clearFilters() {

    this.searchText = '';

    this.selectedType =
      'All Properties';

    this.selectedStatus =
      'All Status';


    this.filteredProperties = [
      ...this.properties
    ];


    this.changeDetectorRef
      .detectChanges();

  }


  // EDIT PROPERTY

  editProperty(index: number) {

    const property =
      this.filteredProperties[index];


    if (
      !property ||
      !property.id
    ) {

      alert(
        'Property ID not found.'
      );

      return;

    }


    localStorage.setItem(
      'editPropertyId',
      property.id
    );


    this.router.navigate([
      '/add-property'
    ]);

  }


  // DELETE PROPERTY

  deleteProperty(index: number) {

    const property =
      this.filteredProperties[index];


    if (
      !property ||
      !property.id
    ) {

      alert(
        'Property ID not found.'
      );

      return;

    }


    const confirmDelete =
      confirm(
        'Are you sure you want to delete this property?'
      );


    if (!confirmDelete) {

      return;

    }


    this.propertyService
      .deleteProperty(property.id)
      .subscribe({

        next: () => {

          this.properties =
            this.properties.filter(
              (p: any) =>
                p.id !== property.id
            );


          this.searchProperties();


          alert(
            'Property deleted successfully.'
          );

        },


        error: (error) => {

          console.error(
            'Error deleting property:',
            error
          );

          alert(
            'Unable to delete property.'
          );

        }

      });

  }

}