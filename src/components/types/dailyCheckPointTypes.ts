import { Dispatch, SetStateAction } from "react"

export type DailyCheckPointProps = {
    isOpenDailyCheckPoint: boolean,
    setIsOpenDailyCheckPoint: Dispatch<SetStateAction<boolean>>
}