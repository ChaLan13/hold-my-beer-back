import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CrudBeerModule} from './CRUD/crud-beer.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [ CrudBeerModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
