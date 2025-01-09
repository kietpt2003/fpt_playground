export type DailyCheckPointProps = {
    isOpenDailyCheckPoint: boolean,
}

export type DailyCheckPointItemProps = {
    date: string,
    dayStatus: "Past" | "Today" | "Future",
    value: number,
    status: "Checked" | "Not checked"
}