import { OrderItem } from "./order-item";

export interface OrderRequest{

    bussinesPartner : Number,
    
    orderItem : OrderItem[]
    
}