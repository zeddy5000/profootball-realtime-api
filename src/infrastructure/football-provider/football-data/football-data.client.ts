import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FootballDataClient {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async get(
    path: string,
    params?: Record<string, unknown>,
  ) {
    const response = await firstValueFrom(
      this.http.get(path, {
        baseURL: this.config.get<string>(
          'footballData.baseUrl',
        ),
        headers: {
          'X-Auth-Token': this.config.get<string>(
            'footballData.apiKey',
          ),
        },
        params,
      }),
    );

    return response.data;
  }
}