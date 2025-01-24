import { User } from "./User.model";
export class  Lecteur extends User{

    CIN: string = ''; 
    Tel: string = ''; 
    Adress: string = ''; 
    Emprunts: Array<any> = []; 
     
}