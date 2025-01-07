import { ServerName } from "../../constants/entities/Server";

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