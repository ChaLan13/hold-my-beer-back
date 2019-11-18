import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {from, Observable, of, throwError} from 'rxjs';
import {Beer} from '../shared/interfaces/beer';
import {find, flatMap, map, tap} from 'rxjs/operators';
import { BEERS } from '../data_temp/beers';
import {CreateBeerDto} from './dto/create-beer.dto';

@Injectable()
export class CrudBeerServiceService {
    // private property to store all people
    private _beer: Beer[];

    /**
     * Class constructor
     */
    constructor() {
        this._beer = [].concat(BEERS).map(beer => Object.assign(beer, {
            birthYear: this._parseDate(beer.birthYear),
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
    private _parseDate(date: string): string {
        const dates = date.split('/');
        if (dates[0].length === 4) {
            return dates[0];
        }
        if (dates[1].length === 4) {
            return dates[1];
        }
        if (dates[2].length === 4) {
            return dates[2];
        }
    }

    /**
     * Returns randomly one beer of the list
     *
     * @returns {Observable<Beer | void>}
     */
    findRandom(): Observable<Beer | void> {
        return of(this._beer[ Math.round(Math.random() * this._beer.length) ])
            .pipe(
                map(_ => !!_ ? _ : undefined),
            );
    }

    /**
     * Returns the beer of the list matching id in parameter
     *
     * @param {string} id of the beer
     *
     * @returns {Observable<Beer>}
     */
    findOne(id: string): Observable<Beer> {
        return from(this._beer)
            .pipe(
                find(_ => _.id === id),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(new NotFoundException(`People with id '${id}' not found`)),
                ),
            );
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param beer to create
     *
     * @returns {Observable<Beer>}
     */
    create(beer: CreateBeerDto): Observable<Beer> {
        return from(this._beer)
            .pipe(
                find(_ => _.name.toLowerCase() === beer.name.toLowerCase() ),
                flatMap(_ =>
                    !!_ ?
                        throwError(
                            new ConflictException(`Beer with the name '${beer.name}' already exists`),
                        ) :
                        this._addBeer(beer),
                ),
            );
    }

    /**
     * Add person with good data in people list
     *
     * @param beer to add
     *
     * @returns {Observable<Beer>}
     *
     * @private
     */
    private _addBeer(beer: CreateBeerDto): Observable<Beer> {
        return of(beer)
            .pipe(
                map(_ =>
                    Object.assign(_, {
                        id: this._createId(),
                    }) as Beer,
                ),
                tap(_ => this._beer = this._beer.concat(_)),
            );
    }

    /**
     * Creates a new id
     *
     * @returns {string}
     *
     * @private
     */
    private _createId(): string {
        return `${new Date().getTime()}`;
    }
}
