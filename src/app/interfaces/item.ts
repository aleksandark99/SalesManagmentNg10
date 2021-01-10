import { Unit } from "./unit";

export interface Item {

    id: Number;
    name: string;
    description : string;
    unitPrice: Number;
    units: Unit[];


}
