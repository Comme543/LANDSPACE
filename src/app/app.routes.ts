import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Properties } from './pages/properties/properties';
import { PropertyDetails } from './pages/property-details/property-details';
import { Map as MapPage } from './pages/map/map';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { PropertyManagement } from './pages/property-management/property-management';
import { Login } from './pages/login/login';
import { VerifyId } from './pages/verify-id/verify-id';
import { Register } from './pages/register/register';
import { AddProperty } from './pages/add-property/add-property';

import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'properties',
    component: Properties
  },

  {
    path: 'property-details/:id',
    component: PropertyDetails
  },

  {
    path: 'map',
    component: MapPage
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard]
  },

  {
    path: 'property-management',
    component: PropertyManagement,
    canActivate: [authGuard]
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'verify-id',
    component: VerifyId
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'add-property',
    component: AddProperty,
    canActivate: [authGuard]
  }

];