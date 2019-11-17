import * as url from 'url';

export interface Beer {
    id?: string;
    name: string;
    country?: string;
    cereal?: Array<string>; // min 1, max 10
    birth: number;

}


export interface Shop {
    priceALiter: number; // price of the beer for a liter
    siteUrl: string; // contain the url of the website corresponding to the price
}
