import { Component, OnInit, OnDestroy } from '@angular/core';
import { Iuser } from './state';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { Store, select } from '@ngrx/store';
import { State } from './reducers';
import { createUser, updateUser } from './reducers/actions';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crud-app';
  private users: Iuser[] = [];
  private subscriptions: Subscription;

  constructor(public dialog: MatDialog, private store: Store<State>, private fireStore: AngularFirestore) { }

  ngOnInit() {
    this.initUsers();
    this.initFirestore();
  }

  initFirestore() {
    this.fireStore.collection('users').get()
      .subscribe(val => console.log(val));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initUsers() {
    const subscription = this.store.pipe(
      select('users')
    ).subscribe(users => {
      console.log(users);
      this.users = users;
    });
    this.subscriptions.add(subscription);
  }

  openDialog(data?: Iuser): void {
    const emptyData = { id: 0, first_name: null, last_name: null, email: null, title: 'Create User' };
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '250px',
      data: data || emptyData,
    });

    const subscription = dialogRef.afterClosed().subscribe(result => {
      if (result && result.title === "Create User") {
        this.createUser(result);
      } else if (result && result.title === "Update User") {
        this.updateUser(result);
      }
    });
    this.subscriptions.add(subscription);
  }

  createUser(data: Iuser): void {
    const usr = { ...data };
    const len = this.users.length;
    usr.id = len > 0 ? this.users.slice(-1)[0].id + 1 : len;
    this.store.dispatch(createUser({ payload: usr }));
  }

  updateUser(data: Iuser): void {
    const usr = { ...data };
    this.store.dispatch(updateUser({ payload: usr }));
  }

}
