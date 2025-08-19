import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-all-enquiries',
  templateUrl: './all-enquiries.component.html',
  styleUrls: ['./all-enquiries.component.css'],
})
export class AllEnquiriesComponent {
  AllEnquiries: any = [];
  constructor(private _service: FirestoreService) {}
  ngOnInit() {
    this.GetAll();
  }

  GetAll() {
    this._service.getItems().subscribe((res: any) => {
      this.AllEnquiries = res;
    });
  }
  open() {
    let phoneNumber = '919350052809';
    let url = `https://wa.me/${phoneNumber}`;
    window.open(url);
  }
}
