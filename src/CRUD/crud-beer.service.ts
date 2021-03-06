import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {from, Observable, of, throwError} from 'rxjs';
import {BeerInterface} from '../shared/interfaces/beer.interface';
import {catchError, find, findIndex, flatMap, map, tap} from 'rxjs/operators';
import { BEERS } from '../data_temp/beers';
import {CreateBeerDto} from './dto/create-beer.dto';
import {UpdateBeerDto} from './dto/update-beer.dto';
import {BeerEntity} from './entities/beer.entity';
import {BeerDao} from './dao/beer.dao';

@Injectable()
export class CrudBeerServiceService {

    /**
     * Class constructor
     *
     * @param {BeerDao} _beerDao instance of the DAO
     */
    constructor(private readonly _beerDao: BeerDao) {
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
        return this._beerDao.find()
            .pipe(
                map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
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
        return this._beerDao.findById(id)
            .pipe(
                catchError(e => throwError(new UnprocessableEntityException(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(new BeerEntity(_)) :
                        throwError(new NotFoundException(`Beer with id '${id}' not found`)),
                ),
            );
    }

    /**
     * Check if beer already exists and add it in beers list
     *
     * @param beer to create
     *
     * @returns {Observable<BeerInterface>}
     */
    create(beer: CreateBeerDto): Observable<BeerEntity> {
        return this._addBeer(beer)
            .pipe(
                flatMap(_ => this._beerDao.create(_)),
                catchError(e =>
                    e.code === 11000 ?
                        throwError(
                            new ConflictException(`Beer with the name '${beer.name}' already exists`),
                        ) :
                        throwError(new UnprocessableEntityException(e.message)),
                ),
                map(_ => new BeerEntity(_)),
            );
    }

    /**
     * Add beer with good data in beer list
     *
     * @param beer to add
     *
     * @returns {Observable<CreateBeerDto>}
     *
     * @private
     */
    private _addBeer(beer: CreateBeerDto): Observable<CreateBeerDto> {
        return of(beer)
            .pipe(
                map(_ =>
                    Object.assign(_, {
                    }) ,
                ),
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
        return this._beerDao.findByIdAndUpdate(id, beer)
            .pipe(
                catchError(e =>
                    e.code === 11000 ?
                        throwError(
                            new ConflictException(`Beer with name '${beer.name}' already exists`),
                        ) :
                        throwError(new UnprocessableEntityException(e.message)),
                ),
                flatMap(_ =>
                    !!_ ?
                        of(new BeerEntity((_))) :
                        throwError(new NotFoundException(`Beer with id '${id}' not found`)),
                ),
            );
    }

    /**
     * Deletes one beer in beer list
     *
     * @param {string} id of the beer to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._beerDao.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(new NotFoundException(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(new NotFoundException(`Beer with id '${id}' not found`)),
                ),
            );
    }
}
