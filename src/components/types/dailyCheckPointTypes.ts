import { Dispatch, SetStateAction } from "react"

export type DailyCheckPointProps = {
    isOpenDailyCheckPoint: boolean,
    setIsOpenDailyCheckPoint: Dispatch<SetStateAction<boolean>>
}

export type DailyCheckPointItem = {
    date: string,
    dayStatus: "Past" | "Today" | "Future",
    value: number,
    status: "Checked" | "Not checked"
}