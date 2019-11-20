import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Subject, of } from 'rxjs';
import { map, mergeMap, catchError, takeUntil } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { getUsers, GET_USERS_FAILURE, GET_USERS_SUCCESS, createUser, CREATE_USER_FAILURE, CREATE_USER_SUCCESS, deleteUser, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, updateUser } from '../reducers/actions';

@Injectable()
export class UserEffects implements OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actions$: Actions, private usersService: UsersService) { }

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(getUsers),
    mergeMap(() => this.usersService.getUsers()
      .pipe(
        takeUntil(this.destroy$),
        map(users => {
          const data = [];
          users.forEach(val => {
            const user = { id: val.payload.doc.id, ...val.payload.doc.data() };
            data.push(user);
          });
          return { type: GET_USERS_SUCCESS, payload: data };
        }),
        catchError(() => of({ type: GET_USERS_FAILURE, payload: "Failed to fetch user" }))
      ))
  )
  );

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(createUser),
    mergeMap(({ payload }) => this.usersService.createUser(payload)
      .pipe(
        takeUntil(this.destroy$),
        map(() => ({ type: CREATE_USER_SUCCESS, payload: 'User Successfully Ceated' })),
        catchError(() => of({ type: CREATE_USER_FAILURE, payload: "Failed to create user" }))
      )
    )
  )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(({ payload }) => this.usersService.deleteUser(payload)
      .pipe(
        takeUntil(this.destroy$),
        map(() => ({ type: DELETE_USER_SUCCESS, payload: 'User Successfully Deleted' })),
        catchError(() => of({ type: DELETE_USER_FAILURE, payload: "Failed to delete user" }))
      )
    )
  )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    mergeMap(({ payload }) => this.usersService.updateUser(payload)
      .pipe(
        takeUntil(this.destroy$),
        map(() => ({ type: DELETE_USER_SUCCESS, payload: 'User Successfully Updated' })),
        catchError(() => of({ type: DELETE_USER_FAILURE, payload: "Failed to update user" }))
      )
    )
  )
  );

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
