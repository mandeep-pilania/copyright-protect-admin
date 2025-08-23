import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  TestimonialForm: FormGroup;
  LastId: any = 0;
  constructor(
    private _service: FirestoreService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.TestimonialForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      id: [''],
    });
  }

  ngOnInit() {
    this.GetTestimonials();
  }

  get V() {
    return this.TestimonialForm.controls;
  }

  onSubmit() {
    if (this.TestimonialForm.invalid) {
      return;
    }
    if (!this.TestimonialForm.value.id) {
      this._service.AddTestimonials(this.TestimonialForm.value, this.LastId);
      this.toastr.success('Testimonial Added Successfully');
    } else {
      let data = {
        ...this.TestimonialForm.value,
      };
      delete data.id;
      this._service.UpdateTestimonial(this.TestimonialForm.value.id, data);
    }
    this.TestimonialForm.reset();
  }

  Edit(item: any) {
    this.TestimonialForm.patchValue({ ...item });
  }
  Delete(id: any) {
    this._service.DeleteTestimonial(id);
  }
  AllTestimonials: any[] = [];
  GetTestimonials() {
    this._service.GetAllTestimonials().subscribe({
      next: (res: any) => {
        this.AllTestimonials = res;
        if (res.length) {
          this.LastId = Math.max(
            ...this.AllTestimonials.map((item) => item.id)
          );
        }
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }
}
