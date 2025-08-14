import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }


    @Get()
    checkHealth() {
        return this.appService.getHealth();
    }

    @Get('hello')
    getHello() {
        return this.appService.getHello();
    }
}
