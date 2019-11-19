import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {BeerInterface} from '../../shared/interfaces/beer.interface';
import {CreateBeerDto} from '../dto/create-beer.dto';
import {UpdateBeerDto} from '../dto/update-beer.dto';

@Injectable()
export class BeerDao {
    /**
     * Class constructor
     *
     * @param {Model<BeerInterface>} _beerModel instance of the model representing a Beer
     */
    constructor(@InjectModel('Beer') private readonly _beerModel: Model<BeerInterface>) {
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Beer[] or undefined
     *
     * @return {Observable<BeerInterface[] | void>}
     */
    find(): Observable<BeerInterface[] | void> {
        return from(this._beerModel.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
            );
    }

    /**
     * Returns one beer of the list matching id in parameter
     *
     * @param {string} id of the beer in the db
     *
     * @return {Observable<BeerInterface | void>}
     */
    findById(id: string): Observable<BeerInterface | void> {
        return from(this._beerModel.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }

    /**
     * Check if beer already exists with index and add it in beer list
     *
     * @param {CreateBeerDto} beer to create
     *
     * @return {Observable<BeerInterface>}
     */
    create(beer: CreateBeerDto): Observable<BeerInterface> {
        return from(this._beerModel.create(beer))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON()),
            );
    }

    /**
     * Update a beer in beer list
     *
     * @param {string} id
     * @param {UpdateBeerDto} beer
     *
     * @return {Observable<BeerInterface | void>}
     */
    findByIdAndUpdate(id: string, beer: UpdateBeerDto): Observable<BeerInterface | void> {
        return from(this._beerModel.findByIdAndUpdate(id, beer, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }

    /**
     * Delete a beer in beer list
     *
     * @param {string} id
     *
     * @return {Observable<BeerInterface | void>}
     */
    findByIdAndRemove(id: string): Observable<BeerInterface | void> {
        return from(this._beerModel.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }
}
