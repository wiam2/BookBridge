import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Lecteur } from '../models/Lecteur.model';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-lecteur',
  templateUrl: './register-lecteur.component.html',
  styleUrls: ['./register-lecteur.component.css']
})
export class RegisterLecteurComponent implements OnInit {
  
  saveSuccess: boolean = false;
 
  User: User = new User();
 Lecteur :Lecteur = new Lecteur()
  constructor(private authser: AuthService, private router: Router) {
  }


  ngOnInit(): void {

   

  }



  onSubmit() {

  

  
  console.log('Formulaire soumis avec succès:', this.User);
   
     
      this.Lecteur.Nom = this.User.Nom;
      this.Lecteur.Prenom = this.User.Prenom;
    
    
      
      this.Lecteur.Email = this.User.Email;
      this.Lecteur.Password = this.User.Password;
      this.Lecteur.ConfirmPassword = this.User.Password;

 
      
      this.CreateLecteur();

  
     
    
  }

  CreateLecteur() {
   
    this.authser.CreateLecteur(this.Lecteur).subscribe(
     
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
