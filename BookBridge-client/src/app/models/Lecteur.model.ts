import { User } from "./User.model";
export class  Lecteur extends User{

    CIN: string = ''; 
    Tel: string = ''; 
    Adresse: string = ''; 
    Emprunts: Array<any> = []; 
     
}