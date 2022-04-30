import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const FIREBASE_MODULES = [AngularFireModule, AngularFireAuthModule, AngularFirestoreModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, FIREBASE_MODULES],
  exports: [FIREBASE_MODULES],
})
export class FirebaseModule {}
