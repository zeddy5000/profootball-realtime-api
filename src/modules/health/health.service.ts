import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}

  getHealth() {
    return {
      status: 'ok',
      environment: this.configService.get<string>('app.environment'),
      timestamp: new Date().toISOString(),
    };
  }
}