import { createReducer, on } from '@ngrx/store';
import { Iuser } from 'src/app/state';
import { getUsers, deleteUser, createUser, updateUser } from '../actions';


const initialState: any[] = []


const _userReducer = createReducer(
    initialState,
    on(getUsers, state => ([...state])),
    on(deleteUser, (state, { payload }) => [...deleteUserById(state, payload)]),
    on(createUser, (state, { payload }) => ([...addUser(state, payload)])),
    on(updateUser, (state, { payload }) => ([...editUser(state, payload)]))
);

export function userReducer(state: Iuser[] | undefined, action: any) {
    return _userReducer(state, action);
}

const editUser = (state: Iuser[], payload: Iuser) => {
    const lst = state.slice();
    const index = lst.findIndex(val => val.id === payload.id);
    lst[index] = payload;
    return lst;
}

const deleteUserById = (state: Iuser[], id: number) => {
    const lst = state.slice();
    lst.splice(lst.findIndex(val => val.id === id), 1);
    return lst;
}

const addUser = (state: Iuser[], user: Iuser) => {
    const lst = [...state.slice(), user];
    return lst;
}