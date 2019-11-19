import { Logger, Module } from '@nestjs/common';
import { CrudBeerController} from './crud-beer.controller';
import { CrudBeerServiceService } from './crud-beer.service';
import {MongooseModule} from '@nestjs/mongoose';
import {BeerSchema} from './schema/crud-beer.schema';
import {BeerDao} from './dao/beer.dao';

@Module({
    imports: [ MongooseModule.forFeature([ { name: 'Beer', schema: BeerSchema } ])],
    controllers: [ CrudBeerController ],
    providers: [ CrudBeerServiceService, Logger, BeerDao ],
})
export class CrudBeerModule {
}
