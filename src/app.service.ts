import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    // Health check
    getHealth(): { status: string; uptime: number; timestamp: string } {
        return {
            status: 'ok',
            uptime: process.uptime(), // seconds since app started
            timestamp: new Date().toISOString(),
        };
    }
}
