import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EspaceLecteurComponent } from './espace-lecteur/espace-lecteur.component';
import {HttpClientModule} from "@angular/common/http";
import { BookDetailsComponent } from './book-details/book-details.component';
import { LecteurNAvComponent } from './lecteur-nav/lecteur-nav.component';
import {FormsModule} from "@angular/forms";
import { AdminBooksComponentComponent } from './admin-books-component/admin-books-component.component';
import { BookFormComponent } from './book-form/book-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EspaceLecteurComponent,
    BookDetailsComponent,
    LecteurNAvComponent,
    AdminBooksComponentComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
