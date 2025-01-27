import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/types";
import { ImageSourcePropType } from "react-native";

export type GameDataItem = {
    gameId: number;
    gameName: string;
    gameImageUrl: ImageSourcePropType;
    totalPeopleOnline: number;
    people: string[];
    status: "Active" | "Inactive"
}

export type GameListNavigationProp = NativeStackNavigationProp<RootStackParamList>;
