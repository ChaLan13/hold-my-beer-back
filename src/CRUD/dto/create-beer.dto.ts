import { CreateShopDto } from './create-shop.dto';

export interface CreateBeerDto {
    readonly id: string;
    readonly name: string;
    readonly country?: string;
    readonly cereal?: string[]; // min 1, max 10
    readonly birthYear: string;
    readonly shop?: CreateShopDto;
}
