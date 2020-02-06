import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';


//domain.com/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header ('content-Type', 'text/html')
  getHello(): {name: string} {
    return {name: 'name'};
  }
}
