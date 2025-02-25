import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/store';
import "./src/services/i18next";
import { AudioProvider } from './src/context/AudioContext';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { ClickProvider } from './src/context/ClickContext';
import { NonPlayerCharacterProvider } from './src/context/NonPlayerCharacterContext';
import * as Font from 'expo-font';
import { PhotoProvider } from './src/context/PhotoContext';
import { CameraProvider } from './src/context/CameraContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { ApiServerProvider } from './src/context/ApiServerContext';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Giữ splash screen cho đến khi các tài nguyên đã được tải xong
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

enableScreens();

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  // Ẩn Splash Screen khi tất cả components đã mount
  useEffect(() => {
    if (isMounted) {
      SplashScreen.hideAsync();
    }
  }, [isMounted]);

  //Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('./assets/fonts/Roboto.ttf'),
        RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
        RobotoSemiBold: require('./assets/fonts/Roboto-SemiBold.ttf'),
        RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
        RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
        DLThuPhap: require('./assets/fonts/DL-ThuPhap.otf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ApiServerProvider>
          <NotificationProvider>
            <AudioProvider>
              <ClickProvider>
                <NonPlayerCharacterProvider>
                  <PhotoProvider>
                    <CameraProvider>
                      <NavigationContainer>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                          <StatusBar backgroundColor={undefined} />
                          <RootNavigator onMount={() => setIsMounted(true)} />
                        </GestureHandlerRootView>
                      </NavigationContainer>
                    </CameraProvider>
                  </PhotoProvider>
                </NonPlayerCharacterProvider>
              </ClickProvider>
            </AudioProvider>
          </NotificationProvider>
        </ApiServerProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
