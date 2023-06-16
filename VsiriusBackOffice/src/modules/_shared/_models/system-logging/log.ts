export interface LogDto {
    logId: string;
    message: string | null;
    level: string | null;
    timeStamp: string | null;
    exception: string | null;
    controllerName: string | null;
    projectName: string | null;
    method: string | null;
}