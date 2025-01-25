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

const routes: Routes = [
  // Ajoutez ici vos routes
  { path: '', component: HomeComponent },
  {path:'login' , component :LoginComponent},
  {path:'registerLecteur',component:RegisterLecteurComponent},
  {path:'creationV',component:CreationVComponent},
  {path:'registerBibliothécaire',component:RegisterBiblioComponent},
  {path:'espacebiblio',component:EspaceBiblioComponent,children:[{path :'GesUser',component:GestionuserComponent},{path:'profil',component:ProfilBiblioComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
