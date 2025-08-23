// src/app/firestore.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private toastr: ToastrService,
    private auth: Auth
  ) {}

  getItems(collection: any): Observable<any[]> {
    const coll = collection(this.firestore, collection);
    return collectionData(coll);
  }
  GetEnquiries() {
    const coll = collection(this.firestore, 'contact_inquiries');
    return collectionData(coll);
  }

  AddTestimonials(data: any, lastId: any) {
    const id = (lastId + 1).toString();
    const docRef = doc(this.firestore, 'testimonials', id); // <- this sets the Firestore doc ID
    return setDoc(docRef, { ...data, id });
  }

  async UpdateTestimonial(id: string, data: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, `testimonials/${id}`);
      await updateDoc(docRef, data);
      this.toastr.success(`Testimonial with ID ${id} updated successfully.`);
    } catch (error) {
      this.toastr.error(`Failed to update testimonial with ID ${id}:`);
    }
  }

  async DeleteTestimonial(id: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, `testimonials/${id}`);
      await deleteDoc(docRef);
      this.toastr.success(`Deleted testimonial with ID: ${id}`);
    } catch (error: any) {
      this.toastr.error(error.message || 'Failed to delete testimonial');
    }
  }

  GetAllTestimonials() {
    const coll = collection(this.firestore, 'testimonials');
    return collectionData(coll);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
