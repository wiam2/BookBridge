import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  isLoginModalOpen = false;  // Assurez-vous que cette variable est bien définie
  isRegisterModalOpen=false;

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/loginBibl']);
  }

  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

  openRegisterModal(): void {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal(): void {
    this.isRegisterModalOpen = false;
  }

  registerAs(role: string): void {
    if (role === 'Bibliothécaire') {
      this.router.navigate(['/registerBibliothécaire']);
    } else if (role === 'Lecteur') {
      this.router.navigate(['/registerLecteur']);
    }
    this.closeRegisterModal();
  }

    LoginAs(role: string): void {
      this.router.navigate(['/login'], { queryParams: { role } });
      this.closeLoginModal();
    this.closeLoginModal();
  }
  goto(route: string) {
    this.router.navigate([`/${route}`]);
  }

}

