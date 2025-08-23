import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private toastr: ToastrService, private router: Router) {}
  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
    this.toastr.success('Logout Successfully');
  }
}
