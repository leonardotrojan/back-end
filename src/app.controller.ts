import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  health(): object {
    return { status: 'ok' };
  }
}
