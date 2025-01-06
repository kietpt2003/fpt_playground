export type DailyCheckPointProps = {
    isOpenDailyCheckPoint: boolean,
}

export type DailyCheckPointItem = {
    date: string,
    dayStatus: "Past" | "Today" | "Future",
    value: number,
    status: "Checked" | "Not checked"
}