import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EspaceLecteurComponent } from './espace-lecteur/espace-lecteur.component';

import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterLecteurComponent } from './register-lecteur/register-lecteur.component';
import { RegisterBiblioComponent } from './register-biblio/register-biblio.component';
import { CreationVComponent } from './creation-v/creation-v.component';
import { EspaceBiblioComponent } from './espace-biblio/espace-biblio.component';
import { GestionuserComponent } from './gestionuser/gestionuser.component';
import { ProfilBiblioComponent } from './profil-biblio/profil-biblio.component';

import { BookDetailsComponent } from './book-details/book-details.component';
import { LecteurNAvComponent } from './lecteur-nav/lecteur-nav.component';

import { AdminBooksComponentComponent } from './admin-books-component/admin-books-component.component';
import { BookFormComponent } from './book-form/book-form.component';
import { EmprunterLecteurComponent } from './emprunter-lecteur/emprunter-lecteur.component';
import { MesEmpruntsComponent } from './mes-emprunts/mes-emprunts.component';
import { AdminEmpruntComponent } from './admin-emprunt/admin-emprunt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EspaceLecteurComponent,
    LoginComponent,
    RegisterLecteurComponent,
    RegisterBiblioComponent,
    CreationVComponent,
    EspaceBiblioComponent,
    GestionuserComponent,
    ProfilBiblioComponent,
    BookDetailsComponent,
    LecteurNAvComponent,
    AdminBooksComponentComponent,
    BookFormComponent,
    EmprunterLecteurComponent,
    MesEmpruntsComponent,
    AdminEmpruntComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
