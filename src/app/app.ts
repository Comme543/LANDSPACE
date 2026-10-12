import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Map } from './pages/map/map';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Map,
    Navbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}