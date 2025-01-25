import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  role: string | null = null;
  User: User = new User();
  authenticatedUser!: User | null;
  message: string = '';
 
  constructor(private route: ActivatedRoute , private AuthService:AuthService, private Router:Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
    });
  }


  gotoregisterBiblio(){
    this.Router.navigate(['/registerBibliothécaire']);
  }
  gotoregisterLecteur(){
    this.Router.navigate(['/registerLecteur']);
  } 
 
  
  login() {
    const credentials = { Email: this.User.Email, Password: this.User.Password };

    this.AuthService.login(credentials).subscribe({
      next: (response) => {
       
        // Récupérer l'utilisateur authentifié
        this.authenticatedUser = this.AuthService.currentUser();
        console.log( this.authenticatedUser)
 
        // Vérifier si l'utilisateur est authentifié avant de naviguer vers la page
        if (this.authenticatedUser) {
       
          if(this.AuthService.currentUserRole()=='RLecteur')
          { console.log('lec')
             this.Router.navigate(['/EspaceLecteur']);}
         
          if(this.AuthService.currentUserRole()=='RBiblio')
          {  console.log('biblio')
           this.Router.navigate(['/espacebiblio']);
          }

         
          
         
        } else {
          // Gérer le cas où l'utilisateur n'est pas authentifié
          this.message = "L'identifiant utilisateur ou le mot de passe est incorrect.";
        }
      },
      error: (err: any) => {
        // Gérer les erreurs de l'authentification
        this.message = "Une erreur s'est produite lors de l'authentification. Veuillez réessayer plus tard.";
        console.error("Erreur lors de l'authentification :", err);
      }
    });
  }
  
}
