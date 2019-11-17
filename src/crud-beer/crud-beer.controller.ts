import {Controller, Get} from '@nestjs/common';

@Controller('crud-beer')
export class CrudBeerController {

    /**
     * test : hello World
     */
    @Get()
    sayHello(): string {
        return 'hello';
    }
}
