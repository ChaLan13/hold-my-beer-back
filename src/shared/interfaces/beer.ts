import * as url from 'url';

export interface Beer {
    id?: string;
    name: string;
    country?: string;
    cereal?: string[]; // min 1, max 10
    birthYear: number;

}

export interface Shop {
    priceALiter: number; // price of the beer for a liter
    siteUrl: string; // contain the url of the website corresponding to the price
}
