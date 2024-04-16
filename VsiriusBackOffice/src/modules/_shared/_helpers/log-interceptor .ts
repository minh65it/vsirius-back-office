import { Injectable, ErrorHandler } from '@angular/core';
import { SystemLoggingService } from '../_services/system-logging.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private systemLoggingService: SystemLoggingService) { }
    handleError(error: any): void {
        // Send the error to an API
        let correlation = null;
        if (error instanceof HttpErrorResponse) {
            correlation = error.headers.get('X-Correlation-Id');
        }
        this.systemLoggingService.writeLogs(error?.toString(), correlation).subscribe({});
    }
}