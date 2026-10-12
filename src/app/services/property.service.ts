import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl =
    'http://localhost:8080/api/properties';

  constructor(
    private http: HttpClient
  ) {}

  // Get all properties
  getProperties(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }


  // Get one property by ID
  getPropertyById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }


  // Add property
  addProperty(property: any) {

    return this.http.post(
      this.apiUrl,
      property
    );

  }


  // Update property
  updateProperty(
    id: string,
    property: any
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      property
    );

  }


  // Delete property
  deleteProperty(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}