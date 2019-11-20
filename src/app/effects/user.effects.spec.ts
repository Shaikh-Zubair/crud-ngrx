import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<UserEffects>(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
