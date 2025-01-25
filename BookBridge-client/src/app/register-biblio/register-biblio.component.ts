import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Bibliothecaire } from '../models/Bibliothecaire.model';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-biblio',
  templateUrl: './register-biblio.component.html',
  styleUrls: ['./register-biblio.component.css']
})
export class RegisterBiblioComponent implements OnInit {
saveSuccess: boolean = false;
 
  User: User = new User();
 Biblio :Bibliothecaire = new Bibliothecaire()
  constructor(private authser: AuthService, private router: Router) {
  }


  ngOnInit(): void {

   

  }



  onSubmit() {

  

  
  console.log('Formulaire soumis avec succès:', this.User);
   
     
      this.Biblio.Nom = this.User.Nom;
      this.Biblio.Prenom = this.User.Prenom;
    
    
      
      this.Biblio.Email = this.User.Email;
      this.Biblio.Password = this.User.Password;
      this.Biblio.ConfirmPassword = this.User.Password;

 
      
      this.CreateBiblio();

  
     
    
  }

  CreateBiblio() {
   
    this.authser.CreateBibliothécaire(this.Biblio).subscribe(
     
      data => {
        console.log(data);
        this.saveSuccess = true;
        this.router.navigate(['/creationV']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
