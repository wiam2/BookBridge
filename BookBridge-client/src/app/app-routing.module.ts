import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterLecteurComponent } from './register-lecteur/register-lecteur.component';
import { CreationVComponent } from './creation-v/creation-v.component';
import { RegisterBiblioComponent } from './register-biblio/register-biblio.component';
import { EspaceBiblioComponent } from './espace-biblio/espace-biblio.component';
import { GestionuserComponent } from './gestionuser/gestionuser.component';
import { ProfilBiblioComponent } from './profil-biblio/profil-biblio.component';
import {EspaceLecteurComponent} from "./espace-lecteur/espace-lecteur.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {AdminBooksComponentComponent} from "./admin-books-component/admin-books-component.component";
import {BookFormComponent} from "./book-form/book-form.component";

const routes: Routes = [
  // Ajoutez ici vos routes
  { path: '', component: HomeComponent },
  {path:'login' , component :LoginComponent},
  {path:'registerLecteur',component:RegisterLecteurComponent},
  {path:'creationV',component:CreationVComponent},
  {path:'registerBibliothécaire',component:RegisterBiblioComponent},
  {path:'espacebiblio',component:EspaceBiblioComponent,children:[{path :'GesUser',component:GestionuserComponent},{path:'profil',component:ProfilBiblioComponent}]},
  { path: 'EspaceLecteur', component: EspaceLecteurComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'Admin-books', component:AdminBooksComponentComponent },
  { path: 'Form-book', component:BookFormComponent},
  { path: 'edit-book/:id', component: BookFormComponent }]





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
