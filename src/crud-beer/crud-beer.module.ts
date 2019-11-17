import { Module } from '@nestjs/common';
import { CrudBeerController } from './crud-beer.controller';

@Module({
    controllers: [ CrudBeerModule ],
})

export class CrudBeerModule {
}
