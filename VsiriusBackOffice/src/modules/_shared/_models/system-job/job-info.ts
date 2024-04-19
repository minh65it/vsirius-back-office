export interface JobInfoDto {
    tittle: string | null;
    description: string | null;
    cron: string | null;
    isRestartDocker: boolean;
    isStop: boolean;
    startDate: string;
}