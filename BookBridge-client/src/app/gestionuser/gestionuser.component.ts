import { Component } from '@angular/core';
import { LecteurService } from '../Services/lecteur.service';
import { Lecteur } from '../models/Lecteur.model';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionuser',
  templateUrl: './gestionuser.component.html',
  styleUrls: ['./gestionuser.component.css']
})
export class GestionuserComponent {
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
