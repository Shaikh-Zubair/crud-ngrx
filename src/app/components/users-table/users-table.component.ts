import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Iuser } from 'src/app/state';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers/index'
import { deleteUser } from 'src/app/reducers/actions';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  users: Iuser[];
  @Output() openDialog = new EventEmitter<Iuser>();

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.initUsers();
  }

  initUsers() {
    this.store.pipe(
      select('users')
    ).subscribe(users => {
      this.users = users;
    });
  }

  onEdit(user: Iuser) {
    const data = { ...user };
    data.title = "Update User";
    this.openDialog.emit(data);
  }

  onDelete(id: string) {
    this.store.dispatch(deleteUser({ payload: id }));
  }

}
