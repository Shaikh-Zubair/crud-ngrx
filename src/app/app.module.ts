import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AllEffects } from './effects';
import { SortListComponent } from './components/sort-list/sort-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UsersTableComponent,
    SortListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PerfectScrollbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    EffectsModule.forRoot([...AllEffects]),
  ],
  entryComponents: [
    AddUserComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: null
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
