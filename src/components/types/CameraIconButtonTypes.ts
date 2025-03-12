import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export type CameraIconButtonProps = {
    icon: MaterialIconName;
    size: number;
    color: string;
    style?: StyleProp<ViewStyle>
    onPress?: () => void;
    disabled?: boolean;
}