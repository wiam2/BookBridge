import {Component, OnInit} from '@angular/core';
import { Book2Service } from '../Services/book2.service';
import {Livre} from "../models/Livre.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mes-emprunts',
  templateUrl: './mes-emprunts.component.html',
  styleUrls: ['./mes-emprunts.component.css']
})
export class MesEmpruntsComponent {

  livres = [
    {
      "titre": "New Moon",
      "date": "15-01-2025",
      "image": "assets/images/Newmooncover.jpg",
      "etat": "En cours"
    },
    {
      "titre": "Dune",
      "date": "09-01-2025",
      "image": "assets/images/dune.jpg",
      "etat": "En cours"
    },
    {
      "titre": "Midnight Sun",
      "date": "21-02-2024",
      "image": "assets/images/Midnight_Sun.jpg",
      "etat": "En retard"
    },
    {
      "titre": "Le petit prince",
      "date": "01-01-2024",
      "image": "assets/images/COVER-Le-Petit-Prince-FR.jpg",
      "etat": "Rendu"
    },

  ];
 
  ngOnInit(): void {
   
  }

  

  


  

 

  
}

