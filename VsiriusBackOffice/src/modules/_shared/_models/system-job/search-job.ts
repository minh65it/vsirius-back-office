export interface SearchJobInfoDto {
    searchKey: string | null;
    cron: string | null;
    isRestartDocker: boolean | null;
    isStop: boolean | null;
}