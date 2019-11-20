import { createReducer, on } from '@ngrx/store';
import { Iuser } from 'src/app/state';
import { deleteUser, createUser, updateUser, getUsersSuccess, sortById, sortByName, sortByEmail } from '../actions';


const initialState: any[] = []


const _userReducer = createReducer(
    initialState,
    on(getUsersSuccess, (state, { payload }) => ([...payload])),
    on(deleteUser, (state, { payload }) => [...deleteUserById(state, payload)]),
    on(createUser, (state, { payload }) => ([...addUser(state, payload)])),
    on(updateUser, (state, { payload }) => ([...editUser(state, payload)])),
    on(sortById, state => [...sortId(state, 'id')]),
    on(sortByName, state => [...sort(state, 'first_name')]),
    on(sortByEmail, state => [...sort(state, 'email')]),
);

export function userReducer(state: Iuser[] | undefined, action: any) {
    return _userReducer(state, action);
}

const sortId = (state: Iuser[], index: string) => {
    const data = state.slice();
    data.sort((a, b) => (a[index] - b[index]));
    return data;
}

const sort = (state: Iuser[], index: string) => {
    const data = state.slice();
    data.sort((a, b) => {
        if (a[index] < b[index]) {
            return -1;
        }
        else if (a[index] > b[index]) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return data;
}

const editUser = (state: Iuser[], payload: Iuser) => {
    const lst = state.slice();
    const index = lst.findIndex(val => val.id === payload.id);
    lst[index] = payload;
    return lst;
}

const deleteUserById = (state: Iuser[], id: string) => {
    const lst = state.slice();
    lst.splice(lst.findIndex(val => val.id === id), 1);
    return lst;
}

const addUser = (state: Iuser[], user: Iuser) => {
    const lst = [...state.slice(), user];
    return lst;
}