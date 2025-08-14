import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Check basic HTTP (example)
      async () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      // Add DB checks here if needed
      // async () => this.db.pingCheck('database', { timeout: 300 }),
    ]);
  }
}
