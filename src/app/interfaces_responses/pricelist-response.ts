import { PricelistDto } from "./pricelist-dto";

export interface PricelistResponse{

    message : String
    error: boolean
    code : Number
    items : PricelistDto[]

}