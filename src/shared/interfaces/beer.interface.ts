import * as url from 'url';
import { Document } from 'mongoose';

export interface BeerInterface extends Document {
    id: string;
    name: string;
    country?: string;
    cereal?: string[]; // min 1, max 10
    birthYear: string;
    shop?: Shop[];
}

export interface Shop {
    priceALiter: number; // price of the beer for a liter
    siteUrl: string; // contain the url of the website corresponding to the price
}
