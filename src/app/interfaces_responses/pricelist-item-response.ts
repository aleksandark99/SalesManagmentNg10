import { CommodityDto } from "./commodity-dto";
import { StringResponse } from "./string-response";

export interface PriceListItemResponse{
    commodities : CommodityDto[]
    stringResponse : StringResponse
}