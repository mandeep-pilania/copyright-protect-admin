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

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  addItem(data: any) {
    const coll = collection(this.firestore, 'contact_inquiries');
    return addDoc(coll, data);
  }

  getItems(): Observable<any[]> {
    const coll = collection(this.firestore, 'contact_inquiries');
    return collectionData(coll);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
