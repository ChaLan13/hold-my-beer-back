import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {from, Observable, of, throwError} from 'rxjs';
import {BeerInterface} from '../shared/interfaces/beer.interface';
import {find, findIndex, flatMap, map, tap} from 'rxjs/operators';
import { BEERS } from '../data_temp/beers';
import {CreateBeerDto} from './dto/create-beer.dto';
import {UpdateBeerDto} from './dto/update-beer.dto';
import {BeerEntity} from './entities/beer.entity';
import {BeerDao} from './dao/beer.dao';

@Injectable()
export class CrudBeerServiceService {
    // private property to store all people
    private _beer: BeerInterface[];

    /**
     * Class constructor
     *
     * @param {BeerDao} _beerDao instance of the DAO
     */
    constructor(private readonly _beerDao: BeerDao) {
        this._beer = [].concat(BEERS).map(beer => Object.assign(beer, {
            birthYear: this._parseDate(beer.birthYear),
        }));
    }

    /**
     * Returns all existing beer in the list
     *
     * @returns {Observable<BeerEntity[] | void>}
     */
    findAll(): Observable<BeerEntity[] | void> {
        return this._beerDao.find()
            .pipe(
                map(_ => !!_ ? _.map(__ => new BeerEntity(__)) : undefined),
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
     * @returns {Observable<BeerEntity | void>}
     */
    findRandom(): Observable<BeerEntity | void> {
        return of(this._beer[ Math.round(Math.random() * this._beer.length) ])
            .pipe(
                map(_ => !!_ ? new BeerEntity(_) : undefined),
            );
    }

    /**
     * Returns the beer of the list matching id in parameter
     *
     * @param {string} id of the beer
     *
     * @returns {Observable<BeerEntity>}
     */
    findOne(id: string): Observable<BeerEntity> {
        return from(this._beer)
            .pipe(
                find(_ => _.id === id),
                flatMap(_ =>
                    !!_ ?
                        of(new BeerEntity(_)) :
                        throwError(new NotFoundException(`People with id '${id}' not found`)),
                ),
            );
    }

    /**
     * Check if beer already exists and add it in people list
     *
     * @param beer to create
     *
     * @returns {Observable<BeerInterface>}
     */
    create(beer: CreateBeerDto): Observable<BeerEntity> {
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
     * Add beer with good data in beer list
     *
     * @param beer to add
     *
     * @returns {Observable<BeerEntity>}
     *
     * @private
     */
    private _addBeer(beer: CreateBeerDto): Observable<BeerEntity> {
        return of(beer)
            .pipe(
                map(_ =>
                    Object.assign(_, {
                        id: this._createId(),
                    }) as BeerInterface,
                ),
                tap(_ => this._beer = this._beer.concat(_)),
                map(_ => new BeerEntity(_)),
            );
    }

    /**
     * Update a beer in beer list
     *
     * @param {string} id of the beer to update
     * @param beer data to update
     *
     * @returns {Observable<BeerEntity>}
     */
    update(id: string, beer: UpdateBeerDto): Observable<BeerEntity> {
        return this._findBeerIndexOfList(id)
            .pipe(
                tap(_ => Object.assign(this._beer[ _ ], beer)),
                map(_ => new BeerEntity(this._beer[ _ ])),
            );
    }

    /**
     * Deletes one person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._findBeerIndexOfList(id)
            .pipe(
                tap(_ => this._beer.splice(_, 1)),
                map(() => undefined),
            );
    }

    /**
     * Finds index of array for current beer
     *
     * @param {string} id of the beer to find
     *
     * @returns {Observable<number>}
     *
     * @private
     */
    private _findBeerIndexOfList(id: string): Observable<number> {
        return from(this._beer)
            .pipe(
                findIndex(_ => _.id === id),
                flatMap(_ => _ > -1 ?
                    of(_) :
                    throwError(new NotFoundException(`Beer with id '${id}' not found`)),
                ),
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
