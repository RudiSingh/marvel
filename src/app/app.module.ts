import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule, MatInputModule,MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegsiterComponent } from './regsiter/regsiter.component'
import { FirebaseAuthService } from './services/firebase-auth.service';
import { ListComponent } from './list/list.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../environments/environment'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    RegsiterComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
