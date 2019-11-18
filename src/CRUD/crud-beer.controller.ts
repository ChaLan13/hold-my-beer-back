import {Body, Controller, Get, Param, Post, UseInterceptors} from '@nestjs/common';
import { Observable, of} from 'rxjs';
import { Beer } from '../shared/interfaces/beer';
import { BEERS } from '../data_temp/beers';
import {BeerInterceptor} from './interceptor/beer.interceptor';
import {CrudBeerServiceService} from './crud-beer.service';
import {CreateBeerDto} from './dto/create-beer.dto';

@Controller('crud-beer')
@UseInterceptors(BeerInterceptor)
export class CrudBeerController {

    /**
     * class constructor
     *
     * @param _beerService
     */
    constructor(private readonly _beerService: CrudBeerServiceService) {
    }

    /**
     * return a string 'beer'
     *
     * @returns observable<string>
     */
    @Get('myBeer')
    sayBeer(): Observable<string> {
        return of('beer');
    }

    /**
     * return the first beer of the list
     *
     * @returns Beer
     */
    @Get('firstBeer')
    getMyPrefBeer(): Observable<Beer> {
        return of(BEERS[0]);
    }

    /**
     * return all the beer in the DB
     *
     * @returns Observable<Beer[] | void>
     */
    @Get()
    findAll(): Observable<Beer[] | void> {
        return this._beerService.findAll();
    }

    /**
     * Handler to answer to /crud-beer/random route
     * insn't working for now
     *
     * @returns Observable<Beer | void>
     */
    @Get('random')
    findRandom(): Observable<Beer | void> {
        return this._beerService.findRandom();
    }

    /**
     * Handler to answer to /crud-beer/:id route
     *
     * @returns Observable<Beer>
     */
    @Get(':id')
    findOne(@Param('id') id: string): Observable<Beer> {
        return this._beerService.findOne(id);
    }

    /**
     * Handler to answer to /people route
     *
     * @param createBeerDto
     *
     * @returns Observable<Beer>
     */
    @Post()
    create(@Body() createBeerDto: CreateBeerDto): Observable<Beer> {
        return this._beerService.create(createBeerDto);
    }
}
