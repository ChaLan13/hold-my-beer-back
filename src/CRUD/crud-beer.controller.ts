import { Controller, Get} from '@nestjs/common';
import { Observable, of} from 'rxjs';
import { Beer } from '../shared/interfaces/beer';
import { BEERS } from '../data_temp/beers';

@Controller('crud-beer')
export class CrudBeerController {

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
}
