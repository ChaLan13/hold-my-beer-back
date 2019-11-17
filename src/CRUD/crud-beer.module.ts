import { Module } from '@nestjs/common';
import { CrudBeerController} from './crud-beer.controller';

@Module({
    controllers: [ CrudBeerController ],
})
export class CrudBeerModule {
}
