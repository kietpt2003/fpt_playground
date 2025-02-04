import { StackNavigationProp } from "@react-navigation/stack";

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
        senderId: string;
        receiverId: string;
    };
    ChineseChessGame: undefined;
    CameraScreen: undefined;
    GameList: undefined;
    ChineseChessBoard: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;

// Định nghĩa kiểu cho props của RootNavigator
export interface RootNavigatorProps {
    onMount: () => void; // Hàm không tham số, không trả về giá trị
}
