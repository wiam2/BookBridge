import { Component } from '@angular/core';
import { LecteurService } from '../Services/lecteur.service';
import { Lecteur } from '../models/Lecteur.model';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-emprunt',
  templateUrl: './admin-emprunt.component.html',
  styleUrls: ['./admin-emprunt.component.css']
})
export class AdminEmpruntComponent {
  livres = [
    {
      "titre": "Harry Potter",
      "date": "15-01-2024",
      "image": "assets/images/Harry_Potter.png",
      "etat": "En retard"
    },
    {
      "titre": "Dune",
      "date": "01-12-2024",
      "image": "assets/images/dune.jpg",
      "etat": "En retard"
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
    {
      "titre": "James Bond",
      "date": "21-02-2024",
      "image": "assets/images/jamesbond.jpg",
      "etat": "En retard"
    },
    {
      "titre": "Harry Potter and the Prisoner of Azkaban",
      "date": "25-06-2024",
      "image": "assets/images/Prisoner_of_Azkaban.jpg",
      "etat": "En retard"
    },
    {
      "titre": "Harry Potter and the Half-Blood Prince",
      "date": "21-03-2024",
      "image": "assets/images/Half-Blood_Prince_cover.png",
      "etat": "En retard"
    },
    {
      "titre": "La Selection",
      "date": "08-08-2024",
      "image": "assets/images/la_selection.jpg",
      "etat": "Rendu"
    },
  ];

lecteurs: Lecteur[] = [];
  error: string | null = null;
  constructor(private lecService:LecteurService ,  private authservice:AuthService , private router:Router) {}
  private mapToLecteur(data: any): Lecteur {
    const condidat = new Lecteur();

    condidat.Id=data.id2 ;
    condidat.Nom = data.nom || ''; // Mapping backend -> frontend
    condidat.Prenom = data.prenom || '';
   
    condidat.Email =data.email || '';
   
    condidat.CIN=data.cin ||'';
    condidat.Tel=data.tel ||'';
  

    return condidat;
  }
  ngOnInit(): void {
    // Liste pour stocker les offres
  

    const idCondidat =this.authservice.currentUser()?.Id;
    if(idCondidat)
    this.lecService.getLecteurs().subscribe({
      next: (data) => {
        console.log(data)
        this.lecteurs = data.map((item: any) => this.mapToLecteur(item));
        console.log(this.lecteurs)
       
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des offres:', err);
        this.error = 'Impossible de charger les offres.';
        
      }
    });
  }

  deletelecteur(id:string){

    console.log(id);
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lecteur ?')) {
      this.lecService.deleteLecteur(id).subscribe(() => {
        this.lecteurs = this.lecteurs.filter((lecteur) => lecteur.Id !== id);
        alert('Lecteur supprimé avec succès.');
      });
    }
  }
  logout() {
   
    this.router.navigate([``]);
  }
}

