import { createAction, props } from '@ngrx/store';
import { Iuser } from 'src/app/state';

export const GET_USERS = '[Users Component] getting_users';
export const GET_USERS_SUCCESS = '[Users Component] getting_users_success';
export const GET_USERS_FAILURE = '[Users Component] getting_users_failure';

export const CREATE_USER = '[CreateUser Component] creating_user';
export const CREATE_USER_SUCCESS = '[CreateUser Component] creating_user_success';
export const CREATE_USER_FAILURE = '[CreateUser Component] creating_user_failure';

export const DELETE_USER = '[User Component] deleting_user';
export const DELETE_USER_SUCCESS = '[User Component] deleting_user_success';
export const DELETE_USER_FAILURE = '[User Component] deleting_user_failure';

export const UPDATE_USER = '[CreateUser Component] updating_user';
export const UPDATE_USER_SUCCESS = '[CreateUser Component] updating_user_success';
export const UPDATE_USER_FAILURE = '[CreateUser Component] updating_user_failure';

export const getUsers = createAction(GET_USERS);
export const getUsersSuccess = createAction(GET_USERS_SUCCESS, props<{ payload: Iuser[] }>());
export const getUsersFailure = createAction(GET_USERS_FAILURE, props<{ payload: string }>());

export const createUser = createAction(CREATE_USER, props<{ payload: Iuser }>());
export const createUserSuccess = createAction(CREATE_USER_SUCCESS, props<{ payload: Iuser }>());
export const createUserFailure = createAction(CREATE_USER_FAILURE, props<{ payload: string }>());

export const deleteUser = createAction(DELETE_USER, props<{ payload: string }>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{ payload: string }>());
export const deleteUserFailure = createAction(DELETE_USER_FAILURE, props<{ payload: string }>());

export const updateUser = createAction(UPDATE_USER, props<{ payload: Iuser }>());
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{ payload: Iuser }>());
export const updateUserFailure = createAction(UPDATE_USER_FAILURE, props<{ payload: string }>());