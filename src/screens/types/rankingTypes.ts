import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ServerName } from "../../constants/entities/Server";
import { RootStackParamList } from "../../navigation/types/types";

export type RankingUser = {
    userId: string;
    userName: string;
    imageUrl: string;
    gender: "Male" | "Female" | "Bisexual" | "Other";
    specializedCode: "SE" | "SS" | "SA" | "DS" | "UN";
    likes: number,
    server: ServerName,
    diamonds: number,
    ranking: number,
}

export type RankingUserProps = {
    user: RankingUser;
}

export type RankingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RankingReward'>;
