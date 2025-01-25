import { Component, OnInit } from '@angular/core';
import { Bibliothecaire } from '../models/Bibliothecaire.model';
import { User } from '../models/User.model';
import { AuthService } from '../Services/auth.service';
import { BiblioService } from '../Services/biblio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil-biblio',
  templateUrl: './profil-biblio.component.html',
  styleUrls: ['./profil-biblio.component.css']
})
export class ProfilBiblioComponent implements OnInit {
  biblio: Bibliothecaire = new Bibliothecaire(); 
  user :User = new User();
  errorMessage: string | null = null;
  ini :boolean=true;
   private mapTobiblio(data: any): Bibliothecaire {
      const condidat = new Bibliothecaire();
  
      condidat.Id=data.id2 ;
      condidat.Nom = data.nom || ''; // Mapping backend -> frontend
      condidat.Prenom = data.prenom || '';
     
      condidat.Email =data.email || '';
     
    
  
      return condidat;
    }
  constructor(
    private authService: AuthService,
    private biblioService: BiblioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Mode édition
  isEditing = false;

  ngOnInit():void{
    const currentUser = this.authService.currentUser();
    if (currentUser?.Id) {
      const id = currentUser.Id;

      // Supposons que GetProfileCandidat retourne un Observable
      this.biblioService.GetProfilebiblio(id).subscribe(
        data => {
          this.biblio = this.mapTobiblio(data);
         
         console.log(data);
          console.log( this.biblio)
        },
        (error) => {
          this.errorMessage = 'Impossible de charger le profil du candidat.';
          console.error(error);
        }
      );
    } else {
      // Redirige l'utilisateur si non authentifié
      this.router.navigate(['/login']);
    }
  }
  

  // Active ou désactive le mode édition
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Sauvegarde les changements
  saveChanges(): void {
    alert('Changements enregistrés avec succès.');
    this.isEditing = false;
  }

  // Annule les changements et quitte le mode édition
  cancelEdit(): void {
    alert('Édition annulée.');
    this.isEditing = false;
  }
}
