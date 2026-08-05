import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiFootballClient {
  private readonly logger = new Logger(ApiFootballClient.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    // Temporary debug logs
    console.log('================ API FOOTBALL CONFIG ================');
    console.log({
      baseUrl: this.config.get<string>('apiFootball.baseUrl'),
      apiKey: this.config.get<string>('apiFootball.apiKey'),
    });
    console.log('=====================================================');
  }

  async get(
    path: string,
    params?: Record<string, unknown>,
  ) {
    const baseUrl = this.config.get<string>('apiFootball.baseUrl');
    const apiKey = this.config.get<string>('apiFootball.apiKey');

    // Temporary debug logs
    console.log('Making request to:', `${baseUrl}${path}`);
    console.log('Using API Key:', apiKey);

    try {
      const response = await firstValueFrom(
        this.http.get(path, {
          baseURL: baseUrl,
          headers: {
            'x-apisports-key': apiKey,
          },
          params,
        }),
      );

      return response.data;
    } catch (error: any) {
      this.logger.error('API Football Request Failed');

      console.error('Status:', error.response?.status);
      console.error('Response:', error.response?.data);
      console.error('Message:', error.message);

      throw error;
    }
  }
}