import { Commodity } from "./commodity";
import { PriceListItemsDto } from "./pricelistitemsdto";

export interface Item {
    commodity: Commodity;
    priceListItemsDto: PriceListItemsDto[];
}
