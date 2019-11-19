import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Iuser } from '../state';
import { userReducer } from './reducer';

export interface State {
  users: Iuser[];
}

export const reducers: ActionReducerMap<State> = {
  users: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
