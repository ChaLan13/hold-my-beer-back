import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CrudBeerModule} from './CRUD/crud-beer.module';

@Module({
  imports: [ CrudBeerModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
