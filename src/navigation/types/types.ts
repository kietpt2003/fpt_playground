import { StackNavigationProp } from "@react-navigation/stack";
import { UserMaskedResponse } from "../../constants/models/conversations/UserMaskedResponse";
import { FriendResponse } from "../../constants/models/friendships/FriendResponse";

export type RootStackParamList = {
    Intro: undefined;
    Signin: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    ChangePasswordScreen: { userEmail: string };
    HomeScreen: undefined;
    GroupChat: { firstFilter: number };
    Ranking: undefined;
    RankingReward: undefined;
    DailyCheckPointScreen: undefined;
    FriendsScreen: undefined;
    FriendChatDetail: {
        userMasked?: UserMaskedResponse;
        friend?: FriendResponse;
        conversationId: string;
    };
    ChineseChessGame: undefined;
    CameraScreen: undefined;
    GameList: undefined;
    ChineseChessBoard: { isPlaySfx: boolean };
    RegisterUser: { serverId: string };
    VerifyCodeScreen: { email: string };
    FriendChatDetailV2: {
        userMasked?: UserMaskedResponse;
        friend?: FriendResponse;
        conversationId: string;
    };
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;

// Định nghĩa kiểu cho props của RootNavigator
export interface RootNavigatorProps {
    onMount: () => void; // Hàm không tham số, không trả về giá trị
}
