import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) {}

  viewFeaturedProperty() {

    const featuredProperty = {
      propertyName: 'Beautiful Residential Land',
      location: 'Jaipur, Rajasthan',
      propertyType: 'Residential',
      area: '2400 Sq. Ft.',
      price: '₹45 Lakh',
      description:
        'Beautiful residential land located in Jaipur, Rajasthan. This verified property is suitable for residential development and future investment.',
      ownerName: 'LANDSPACE Verified Owner',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      status: 'Verified'
    };

    localStorage.setItem(
      'selectedProperty',
      JSON.stringify(featuredProperty)
    );

    this.router.navigate(['/property-details']);
  }

}