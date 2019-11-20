import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Iuser } from '../state';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fireStore: AngularFirestore) { }

  getUsers(): Observable<any> {
    return this.fireStore.collection('users').snapshotChanges();
  }

  createUser(data: Iuser): Observable<any> {
    return of(this.fireStore.collection('users').doc(data.id).set({ ...data }));
  }

  deleteUser(id: string): Observable<any> {
    return of(this.fireStore.collection('users').doc(id).delete());
  }

  updateUser(data: Iuser): Observable<any> {
    return of(this.fireStore.collection('users').doc(data.id).update(data));
  }


}
