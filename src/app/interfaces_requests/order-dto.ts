import {OrderItem} from "./order-item";

export interface OrderDto{
    bussinesPartnerId : Number
    totalBasis : Number
    taxAmount : Number
    total : Number
    items : OrderItem[]
}