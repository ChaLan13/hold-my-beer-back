import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {BeerInterface} from '../../shared/interfaces/beer.interface';

@Injectable()
export class BeerDao {
    /**
     * Class constructor
     *
     * @param {Model<BeerInterface>} _beerModel instance of the model representing a Beer
     */
    constructor(@InjectModel('Person') private readonly _personModel: Model<BeerInterface>) {
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Beer[] or undefined
     *
     * @return {Observable<BeerInterface[] | void>}
     */
    find(): Observable<BeerInterface[] | void> {
        return from(this._personModel.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
            );
    }
}
