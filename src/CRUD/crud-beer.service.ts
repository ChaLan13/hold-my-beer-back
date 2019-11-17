import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import {Beer} from '../shared/interfaces/beer';
import { map } from 'rxjs/operators';
import { BEERS } from '../data_temp/beers';

@Injectable()
export class CrudBeerServiceService {
    // private property to store all people
    private _beer: Beer[];

    /**
     * Class constructor
     */
    constructor() {
        this._beer = [].concat(BEERS).map(beer => Object.assign(beer, {
            birthDate: this._parseDate(beer.birthDate),
        }));
    }

    /**
     * Returns all existing beer in the list
     *
     * @returns {Observable<Beer[] | void>}
     */
    findAll(): Observable<Beer[] | void> {
        return of(this._beer)
            .pipe(
                map(_ => (!!_ && !!_.length) ? _ : undefined),
            );
    }

    /**
     * Function to parse date and return timestamp
     *
     * @param {string} date to parse
     *
     * @returns {number} timestamp
     *
     * @private
     */
    private _parseDate(date: string): number {
        const dates = date.split('/');
        if (dates[0].length === 4) {
            return Number(dates[0]);
        }
        if (dates[1].length === 4) {
            return Number(dates[1]);
        }
        if (dates[2].length === 4) {
            return Number(dates[2]);
        }
    }
}
