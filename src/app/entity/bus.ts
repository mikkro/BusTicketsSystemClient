import { BusStop } from './bus-stop';
import { Seat } from './seat';

export class Bus {
    id:number;
    number:number;
    price:number;
    busStops:BusStop[];
    seats:Seat[];
}
