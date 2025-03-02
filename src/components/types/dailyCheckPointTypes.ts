import { Dispatch, SetStateAction } from "react";

export type DailyCheckPointProps = {
    setStringErr: Dispatch<SetStateAction<string>>
    setIsError: Dispatch<SetStateAction<boolean>>
}

export type DailyCheckPointItemProps = {
    id: string;
    date: string;
    dayStatus: "Past" | "Today" | "Future";
    coinValue?: number;
    diamondValue?: number;
    status: "Checked" | "Unchecked";
};
