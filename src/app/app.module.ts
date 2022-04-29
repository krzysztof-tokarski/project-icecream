import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyDmknldActfY9SI1FbFKE2thRSR0urvbyo',
  authDomain: 'project-icecream-9c598.firebaseapp.com',
  projectId: 'project-icecream-9c598',
  storageBucket: 'project-icecream-9c598.appspot.com',
  messagingSenderId: '891793697399',
  appId: '1:891793697399:web:4f401ba5da5410799cb472',
  measurementId: 'G-1N43B0YG5G',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
