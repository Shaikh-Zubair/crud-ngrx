import { Component, OnInit, OnDestroy } from '@angular/core';
import { Iuser } from './state';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { Store, select } from '@ngrx/store';
import { State } from './reducers';
import { createUser, updateUser, getUsers } from './reducers/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crud-app';
  private users: Iuser[] = [];
  private subscriptions: Subscription = new Subscription;

  constructor(public dialog: MatDialog, private store: Store<State>) { }

  ngOnInit() {
    this.getUsers();
    this.initUsers();
  }

  getUsers() {
    this.store.dispatch(getUsers());
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
    usr.id = (len > 0 ? parseInt(this.users.slice(-1)[0].id) + 1 : len).toString();
    this.store.dispatch(createUser({ payload: usr }));
  }

  updateUser(data: Iuser): void {
    const usr = { ...data };
    this.store.dispatch(updateUser({ payload: usr }));
  }

}
