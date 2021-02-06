import { Item } from "./item";

export interface Pricelist {

        code: Number;
        error: Boolean;
        items: Item[];
        message: string;

}