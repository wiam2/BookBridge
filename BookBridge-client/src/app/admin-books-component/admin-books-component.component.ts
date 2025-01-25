import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {Livre} from "../models/Livre.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-books-component',
  templateUrl: './admin-books-component.component.html',
  styleUrls: ['./admin-books-component.component.css']
})
export class AdminBooksComponentComponent implements OnInit {
  livres:Livre[] = [];
  showAddForm: boolean = false;
  newBook: { image: string; titre: string; genre: string; auteur: string; editeur: string } = {
    titre: '',
    auteur: '',
    editeur: '',
    genre: '',
    image: ''  // ou undefined si vous ne souhaitez pas initialiser les autres valeurs
  };
  titre: string = '';
  auteur: string = '';
  genre: string = '';
  anneePublication: number | null = null;
  disponiblesUniquement: boolean = false;
  showSearchForm: boolean = false;
  constructor(private livreService: BookService,
              private router: Router) {}

  ngOnInit(): void {
    this.fetchLivres();
  }

  fetchLivres(): void {
    this.livreService.getAllBooks().subscribe(
      (data: any[]) => {
        this.livres = data;
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  openAddForm(): void {
    this.showAddForm = true;
  }

  cancelAddForm(): void {
    this.showAddForm = false;
  }


  editBook(id: number): void {
    // Naviguer vers la route de modification avec l'ID du livre
    this.router.navigate(['/edit-book', id]);
  }

  deleteBook(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce livre ?');
    if (confirmation) {
      this.livreService.deleteLivre(id).subscribe(
        () => {
          this.livres = this.livres.filter((livre) => livre.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du livre', error);
        }
      );
    }
  }

  OpenForm(): void {
    this.router.navigate(['/Form-book']);
  }


  rechercherLivres(): void {
    this.livreService.rechercherLivres(
        this.titre,
        this.auteur,
        this.genre,
        this.anneePublication,
        this.disponiblesUniquement
    ).subscribe({
      next: (data) => {
        this.livres = data;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche des livres', err);
      }
    });
  }

  toggleSearchForm(): void {
    this.showSearchForm = !this.showSearchForm;  // Permet de basculer l'affichage du formulaire
  }

  protected readonly length = length;
  // Méthode pour réinitialiser tous les filtres
  resetFilters(): void {
    this.titre = '';
    this.auteur = '';
    this.genre = '';
    this.anneePublication = null;
    this.disponiblesUniquement = false;
    this.fetchLivres();
    this.showSearchForm=false;
  }
}
