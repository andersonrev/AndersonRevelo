import { ProductInterface } from "./product.interface";

export interface ResponseCreateProductInterface {
    message: string;
    data: ProductInterface
}

export interface ResponseUpdateProductInterface {
    message: string;
    data: Omit<ProductInterface, 'id'>
}