import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EspaceLecteurComponent} from "./espace-lecteur/espace-lecteur.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {AdminBooksComponentComponent} from "./admin-books-component/admin-books-component.component";
import {BookFormComponent} from "./book-form/book-form.component";

const routes: Routes = [
  { path: 'EspaceLecteur', component: EspaceLecteurComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: 'Admin-books', component:AdminBooksComponentComponent },
  { path: 'Form-book', component:BookFormComponent},
  { path: 'edit-book/:id', component: BookFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
