import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firestore.service';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-enquiries',
  templateUrl: './all-enquiries.component.html',
  styleUrls: ['./all-enquiries.component.css'],
})
export class AllEnquiriesComponent implements OnInit {
  AllEnquiries: any[] = [];
  currentUser: User | null = null;

  constructor(
    private _service: FirestoreService,
    private auth: Auth,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Firebase Auth listener
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.GetAll();
      } else {
        this.currentUser = null;
      }
    });
  }

  GetAll(): void {
    this._service.GetEnquiries().subscribe({
      next: (res: any) => {
        this.AllEnquiries = res;
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
}
