import {Component, OnInit} from '@angular/core';
import {Livre} from "../models/Livre.model";
import { Book2Service } from '../Services/book2.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-emprunter-lecteur',
  templateUrl: './emprunter-lecteur.component.html',
  styleUrls: ['./emprunter-lecteur.component.css']
})
export class EmprunterLecteurComponent {

  book = {
    "titre": "Breaking Dawn",
    "editeur": "Little, Brown and Company",
    "image": "image rien amal",
    "auteur": "Stephenie Meyer",
    "genre": "	Paranormal romance, young adult fiction, vampire fiction",
    "annee": 2008,
    "nombreCopies": 50
  };
 

  constructor(

  ) { }

  ngOnInit(): void {
   
  }

  // Méthode pour récupérer les détails du livre
  getBookDetails(): void {
    
  }
  showAlert: boolean = false;

  borrowBook() {
    // Afficher l'alerte
    this.showAlert = true;
  }

  closeAlert() {
    // Masquer l'alerte
    this.showAlert = false;
  }

}

