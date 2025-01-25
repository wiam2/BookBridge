
export class Livre{
  id: number = 0;
  titre: string = '';
  editeur: string = '';
  image: string = '';
  auteur: string = '';
  genre: string = '';
  annee: number = new Date().getFullYear();
  nombreCopies: number = 0;
  emprunts: any[] = [];
}
