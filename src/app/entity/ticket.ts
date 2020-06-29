import { Seat } from './seat';
import { User } from './user';
import { BusStop } from './bus-stop';

export class Ticket {
    id:number;
    ticketNumber:number;
    price:number;
    seats:Seat[]=[];
    user:User;
    origin:string;
    destination:string;
}
