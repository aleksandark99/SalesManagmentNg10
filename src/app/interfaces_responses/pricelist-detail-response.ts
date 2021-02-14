import { PricelistDetailDto } from "./pricelist-detail-dto";

export interface PricelistDetailResponse{
    
    message : String
    error: boolean
    code : Number
    details : PricelistDetailDto[]
}