import { createAction } from '@ngrx/store';


export const SORT_BY_ID = '[Sort Component] sort_by-id';
export const SORT_BY_NAME = '[Sort Component] sort_by-name';
export const SORT_BY_EMAIL = '[Sort Component] sort_by-email';

export const sortById = createAction(SORT_BY_ID);
export const sortByName = createAction(SORT_BY_NAME);
export const sortByEmail = createAction(SORT_BY_EMAIL);