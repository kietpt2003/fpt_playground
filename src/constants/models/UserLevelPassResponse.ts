export type UserLevelPassResponse = {
    userId: string;
    levelPassId: string;
    level: number;
    coinValue?: number;
    diamondValue?: number;
    experience: number;
    percentage: number;
    require: number;
    isClaim: boolean;
}