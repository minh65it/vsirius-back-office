export interface LogDto {
    logId: string;
    message: string | null;
    level: string | null;
    timeStamp: string | null;
    exception: string | null;
    url: string | null;
    projectName: string | null;
    correlationId: string;
}