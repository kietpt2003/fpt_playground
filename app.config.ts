import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "FPT Playground",
    slug: "fpt_playground",
    plugins: [
        [
            "expo-splash-screen",
            {
                "backgroundColor": "#000000",
                "image": "./assets/images/splash-icon.png",
                "dark": {
                    "image": "./assets/images/splash-icon.png",
                    "backgroundColor": "#000000"
                },
                "imageWidth": 200
            }
        ],
        [
            "expo-location",
            {
                "locationWhenInUsePermission": "Show current location on map."
            }
        ],
        [
            "@rnmapbox/maps",
            {
                RNMapboxMapsDownloadToken: process.env.EXPO_PUBLIC_RN_MAPBOX_MAPS_DOWNLOAD_TOKEN,
                RNMapboxMapsVersion: "11.0.0",
            },
        ],
        [
            "@react-native-google-signin/google-signin"
        ]
    ],
});