import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Health')
@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Application health check',
  })
  @ApiResponse({
    status: 200,
    description: 'Application is running.',
  })
  check() {
    return this.healthService.getHealth();
  }
}