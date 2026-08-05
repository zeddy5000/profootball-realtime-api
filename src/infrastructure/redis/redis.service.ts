import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.redis.ping();
    this.logger.log(' Connected to Redis');
  }

  async set(
    key: string,
    value: unknown,
    ttlSeconds?: number,
  ): Promise<void> {
    const serialized = JSON.stringify(value);

    if (ttlSeconds) {
      await this.redis.set(key, serialized, 'EX', ttlSeconds);
      return;
    }

    await this.redis.set(key, serialized);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async sadd(
    key: string,
    value: string,
  ): Promise<void> {
    await this.redis.sadd(key, value);
  }

  async smembers(
    key: string,
  ): Promise<string[]> {
    return this.redis.smembers(key);
  }

  async srem(
    key: string,
    value: string,
  ): Promise<void> {
    await this.redis.srem(key, value);
  }

  async exists(key: string): Promise<boolean> {
    const exists = await this.redis.exists(key);
    return exists === 1;
  }

  async flush(): Promise<void> {
    await this.redis.flushdb();
  }
}