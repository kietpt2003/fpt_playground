import { Dispatch, SetStateAction } from "react";

export type RankingRulesModalProps = {
    isOpenRules: boolean;
    setOpenRules: Dispatch<SetStateAction<boolean>>
}