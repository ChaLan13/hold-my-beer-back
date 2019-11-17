import { Logger, Module } from '@nestjs/common';
import { CrudBeerController} from './crud-beer.controller';
import { CrudBeerServiceService } from './crud-beer.service';

@Module({
    controllers: [ CrudBeerController ],
    providers: [ CrudBeerServiceService, Logger ],
})
export class CrudBeerModule {
}
