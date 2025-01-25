import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-biblio',
  templateUrl: './espace-biblio.component.html',
  styleUrls: ['./espace-biblio.component.css']
})
export class EspaceBiblioComponent {
  ini :boolean=true;
constructor(private router: Router) {}
goto(route: string) {
  this.ini=false;
  this.router.navigate([`/espacebiblio/${route}`]);
}
}
