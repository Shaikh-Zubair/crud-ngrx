import { createAction, props } from '@ngrx/store';
import { Iuser } from 'src/app/state';

export const GET_USERS = '[Users Component] getting_users';
export const CREATE_USER = '[CreateUser Component] creating_user';
export const DELETE_USER = '[User Component] deleting_user';
export const UPDATE_USER = '[CreateUser Component] updating_user';

export const getUsers = createAction(GET_USERS);
export const createUser = createAction(CREATE_USER, props<{ payload: Iuser }>());
export const deleteUser = createAction(DELETE_USER, props<{ payload: number }>());
export const updateUser = createAction(UPDATE_USER, props<{ payload: Iuser }>());