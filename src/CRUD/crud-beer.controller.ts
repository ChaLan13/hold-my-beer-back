import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import { Observable, of} from 'rxjs';
import { BeerInterface } from '../shared/interfaces/beer.interface';
import {BeerInterceptor} from './interceptor/beer.interceptor';
import {CrudBeerServiceService} from './crud-beer.service';
import {CreateBeerDto} from './dto/create-beer.dto';
import {UpdateBeerDto} from './dto/update-beer.dto';
import { HandlerParams } from './validators/handler-params';
import {BeerEntity} from './entities/beer.entity';
import {
    ApiBadRequestResponse, ApiConflictResponse,
    ApiCreatedResponse, ApiImplicitBody,
    ApiImplicitParam,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiUnprocessableEntityResponse,
    ApiUseTags
} from '@nestjs/swagger';

@ApiUseTags('beer')
@Controller('crud-beer')
@UseInterceptors(ClassSerializerInterceptor)
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
     * /crud-beer/myBeer method GET
     * return a string 'beer'
     *
     * @returns observable<string>
     */
    @Get('myBeer')
    sayBeer(): Observable<string> {
        return of('beer');
    }

    /**
     * return all the beer in the DB
     *
     * @returns Observable<BeerInterface[] | void>
     */
    @ApiOkResponse({ description: 'Returns an array of beer', type: BeerEntity, isArray: true })
    @ApiNoContentResponse({ description: 'No beer exists in database' })
    @Get('findAll')
    findAll(): Observable<BeerEntity[] | void> {
        return this._beerService.findAll();
    }

    /**
     * /crud-beer/random method GET
     * Handler to answer to /crud-beer/random route
     * insn't working for now
     *
     * @returns Observable<BeerInterface | void>
     */
    @ApiOkResponse({ description: 'Returns a beer randomly', type: BeerEntity })
    @ApiNoContentResponse({ description: 'No beer exists in database' })
    @Get('random')
    findRandom(): Observable<BeerEntity | void> {
        return this._beerService.findRandom();
    }

    /**
     * Handler to answer to GET /crud-beer/r:id route
     *
     * @param {HandlerParams} params list of route params to take beer id
     *
     * @returns Observable<BeerInterface>
     */
    @ApiOkResponse({ description: 'Returns the beer for the given "id"', type: BeerEntity })
    @ApiNotFoundResponse({ description: 'BeerInterface with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the beer in the database', type: String })
    @Get('lookup' + ':id')
    findOne(@Param() params: HandlerParams): Observable<BeerEntity> {
        return this._beerService.findOne(params.id);
    }

    /**
     * Handler to answer to POST /beer route
     *
     * @param createBeerDto data to create
     *
     * @returns Observable<BeerInterface>
     */
    @ApiCreatedResponse({ description: 'The beer has been successfully created', type: BeerEntity })
    @ApiConflictResponse({ description: 'The beer already exists in the database' })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitBody({ name: 'CreateBeerDto', description: 'Payload to create a new beer', type: CreateBeerDto })
    @Post('create')
    create(@Body() createBeerDto: CreateBeerDto): Observable<BeerEntity> {
        return this._beerService.create(createBeerDto);
    }

    /**
     * Handler to answer to PUT /beer/:id route
     *
     * @param {HandlerParams} params list of route params to take beer id
     * @param updateBeerDto data to update
     *
     * @returns Observable<BeerInterface>
     */
    @ApiOkResponse({ description: 'The beer has been successfully updated', type: BeerEntity })
    @ApiNotFoundResponse({ description: 'BeerInterface with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the beer in the database', type: String })
    @ApiImplicitBody({ name: 'UpdateBeerDto', description: 'Payload to update a beer', type: UpdateBeerDto })
    @Put('update' + ':id')
    update(@Param() params: HandlerParams, @Body() updateBeerDto: UpdateBeerDto): Observable<BeerEntity> {
        return this._beerService.update(params.id, updateBeerDto);
    }

    /**
     * Handler to answer to DELETE /beer/:id route
     *
     * @param {HandlerParams} params list of route params to take beer id
     *
     * @returns Observable<void>
     */
    @ApiNoContentResponse({ description: 'The beer has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'BeerInterface with the given "id" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiImplicitParam({ name: 'id', description: 'Unique identifier of the beer in the database', type: String })
    @Delete('delete' + ':id')
    delete(@Param() params: HandlerParams): Observable<void> {
        return this._beerService.delete(params.id);
    }
}
