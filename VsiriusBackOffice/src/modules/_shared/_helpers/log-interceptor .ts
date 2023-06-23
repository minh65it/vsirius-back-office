import { Injectable, ErrorHandler } from '@angular/core';
import { SystemLoggingService } from '../_services/system-logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private systemLoggingService: SystemLoggingService) { }
    handleError(error: any): void {
        console.log(error);
        // Send the error to an API
        this.systemLoggingService.writeLogs(error?.toString()).subscribe({});
    }
}