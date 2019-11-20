import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { sortById, sortByName, sortByEmail } from 'src/app/reducers/actions';

@Component({
  selector: 'app-sort-list',
  templateUrl: './sort-list.component.html',
  styleUrls: ['./sort-list.component.css']
})
export class SortListComponent implements OnInit {

  title: string = "Sort By";

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  sortById() {
    this.title = 'Id';
    this.store.dispatch(sortById())
  }
  sortByName() {
    this.title = 'Name';
    this.store.dispatch(sortByName())
  }
  sortByEmail() {
    this.title = 'Email';
    this.store.dispatch(sortByEmail())
  }

}
