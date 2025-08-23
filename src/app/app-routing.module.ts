import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { AllEnquiriesComponent } from './All Enquiries/all-enquiries/all-enquiries.component';
import { AuthGuard } from './helpers/auth.guard';
import { TestimonialsComponent } from './Testimonials/testimonials/testimonials.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: 'all-enquiries', component: AllEnquiriesComponent },
      {
        path: 'testimonials',
        component: TestimonialsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
