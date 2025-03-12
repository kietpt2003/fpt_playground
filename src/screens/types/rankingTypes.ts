import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/types";
import { ServerName } from "../../constants/models/users/ServerResponse";

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
