import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudBearModule } from './crud-bear/crud-bear.module';

@Module({
  imports: [CrudBearModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
