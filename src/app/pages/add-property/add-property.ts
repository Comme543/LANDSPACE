import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-property',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty {

  private apiUrl = 'http://localhost:8080/api/properties';

  selectedImage: string = '';

  editId: string = '';

  propertyForm = new FormGroup({
    propertyName: new FormControl(''),
    location: new FormControl(''),
    propertyType: new FormControl(''),
    area: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    ownerName: new FormControl('')
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    const savedPropertyId =
      localStorage.getItem('editPropertyId');

    if (savedPropertyId) {

      this.editId = savedPropertyId;

      this.loadPropertyForEdit(savedPropertyId);

    }

  }


  // LOAD PROPERTY FOR EDIT

  loadPropertyForEdit(id: string) {

    this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .subscribe({

        next: (property) => {

          this.propertyForm.patchValue({

            propertyName: property.propertyName,
            location: property.location,
            propertyType: property.propertyType,
            area: property.area,
            price: property.price,
            description: property.description,
            ownerName: property.ownerName

          });

          this.selectedImage =
            property.image || '';

        },

        error: (error) => {

          console.error(
            'Error loading property:',
            error
          );

          alert(
            'Unable to load property.'
          );

          localStorage.removeItem(
            'editPropertyId'
          );

          this.router.navigate([
            '/property-management'
          ]);

        }

      });

  }


  // SELECT IMAGE

  onImageSelected(event: Event) {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      const file =
        input.files[0];

      const reader =
        new FileReader();

      reader.onload = () => {

        this.selectedImage =
          reader.result as string;

      };

      reader.readAsDataURL(file);

    }

  }


  // ADD OR UPDATE PROPERTY

  addProperty() {

    const property = {

      propertyName:
        this.propertyForm.value.propertyName,

      location:
        this.propertyForm.value.location,

      propertyType:
        this.propertyForm.value.propertyType,

      area:
        this.propertyForm.value.area,

      price:
        this.propertyForm.value.price,

      description:
        this.propertyForm.value.description,

      ownerName:
        this.propertyForm.value.ownerName,

      image:
        this.selectedImage,

      status:
        'Verified'

    };


    // UPDATE EXISTING PROPERTY

    if (this.editId) {

      this.http
        .put(
          `${this.apiUrl}/${this.editId}`,
          property
        )
        .subscribe({

          next: () => {

            alert(
              'Property updated successfully!'
            );

            localStorage.removeItem(
              'editPropertyId'
            );

            this.router.navigate([
              '/property-management'
            ]);

          },

          error: (error) => {

            console.error(
              'Error updating property:',
              error
            );

            alert(
              'Failed to update property.'
            );

          }

        });

      return;

    }


    // ADD NEW PROPERTY

    this.http
      .post(
        this.apiUrl,
        property
      )
      .subscribe({

        next: () => {

          alert(
            'Property added successfully!'
          );

          this.propertyForm.reset();

          this.selectedImage = '';

        },

        error: (error) => {

          console.error(
            'Error adding property:',
            error
          );

          alert(
            'Failed to add property.'
          );

        }

      });

  }

}