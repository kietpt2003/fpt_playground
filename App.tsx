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

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AudioProvider>
          <ClickProvider>
            <NavigationContainer>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar backgroundColor={undefined} />
                <RootNavigator onMount={() => setIsMounted(true)} />
              </GestureHandlerRootView>
            </NavigationContainer>
          </ClickProvider>
        </AudioProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
