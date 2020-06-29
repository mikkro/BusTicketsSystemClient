import { Role } from './role';
import { Ticket } from './ticket';

export class User {
    id:number;
    firstName:string="";
    lastName:string="";
    username: string="";
    password: string="";
    tickets:Ticket[];
    email:string="";
    role:Role;
    token:string;
}
