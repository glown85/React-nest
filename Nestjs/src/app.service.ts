import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {//REACH DATABASE. LOGIC AND STUFF
    return 'Hello World!';
  }
}
