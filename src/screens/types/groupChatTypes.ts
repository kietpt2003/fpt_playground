import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types/types";
import { RouteProp } from "@react-navigation/native";

export type GroupChatNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GroupChat'>;
export type GroupChatRouteProp = RouteProp<RootStackParamList, "GroupChat">;
