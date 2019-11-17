import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * test return : 'Hello World!'
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
