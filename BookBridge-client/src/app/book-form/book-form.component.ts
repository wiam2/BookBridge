import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livre } from "../models/Livre.model";
import { BookService } from "../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() livre: Livre | null = null; // Livre existant (pour la modification)
  @Output() save = new EventEmitter<Livre>(); // Événement pour sauvegarder
  @Output() cancel = new EventEmitter<void>(); // Événement pour annuler
    bookForm: Livre = new Livre();

  bookId: number | null = null;

    formIsValid: boolean = false; // Validation du formulaire
  isSaving: boolean = false; // Indicateur pour savoir si la sauvegarde est en cours
  errorMessage: string = ''; // Message d'erreur en cas de problème lors de la sauvegarde
  formTitle: string = 'Enregistrer un Livre';
  constructor(private livreService: BookService,
              private route: ActivatedRoute, private router: Router) {} // Injection du service

  ngOnInit(): void {
      this.bookId = +this.route.snapshot.paramMap.get('id')!;  // Utilise l'ID de l'URL comme nombre

      // Si un ID est présent, on va charger les données du livre
      if (this.bookId) {
          this.formTitle = 'Modifier un Livre';
          this.loadBookData(this.bookId);
      }
  }
    // Méthode pour charger les données du livre
    loadBookData(id: number): void {
        this.livreService.getBookById(id).subscribe(
            (data: Livre) => {
                this.bookForm = data; // Assigner les détails récupérés à la propriété 'bookForm'
            },
            (error) => {
                console.error('Erreur lors de la récupération des détails du livre:', error);
            }
        );
    }


  // Méthode appelée lorsqu'on enregistre le livre
    onSave(): void {
        this.isSaving = true; // Indiquer que la sauvegarde est en cours

        // Vérifier si un ID est présent pour déterminer s'il s'agit d'une mise à jour ou d'une création
        if (this.bookId) {
            // Si un ID est présent, on met à jour le livre
            this.livreService.updateLivre(this.bookId, this.bookForm).subscribe(
                (response) => {
                    this.isSaving = false;
                    this.save.emit(this.bookForm); // Émettre l'événement de sauvegarde
                    alert('Livre modifié avec succès!');
                    this.router.navigate(['/Admin-books']);
                },
                (error) => {
                    this.isSaving = false;
                    this.errorMessage = 'Erreur lors de la modification du livre. Veuillez réessayer.';
                    console.error('Error updating book', error);
                }
            );
        } else {
            // Si l'ID est absent, on crée un nouveau livre
            this.livreService.saveLivre(this.bookForm).subscribe(
                (response) => {
                    this.isSaving = false;
                    this.save.emit(this.bookForm); // Émettre l'événement de sauvegarde
                    alert('Livre enregistré avec succès!');
                    this.router.navigate(['/Admin-books']);
                },
                (error) => {
                    this.isSaving = false;
                    this.errorMessage = 'Erreur lors de l\'enregistrement du livre. Veuillez réessayer.';
                    console.error('Error saving book', error);
                }
            );
        }
    }


  // Méthode pour annuler
  onCancel(): void {
    this.cancel.emit(); // Émettre l'annulation
  }

  // Méthode pour gérer le changement d'image
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.bookForm.image = reader.result as string; // Convertir en base64
      };
      reader.readAsDataURL(file);
    }
  }

}
