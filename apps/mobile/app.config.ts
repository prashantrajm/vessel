import type { ConfigContext, ExpoConfig } from "expo/config";

type AppVariant = "development" | "production";

const APP_VARIANT: AppVariant =
  process.env.APP_VARIANT === "production" ? "production" : "development";

const VARIANTS = {
  development: {
    name: "Vessel Dev",
    bundleIdentifier: "com.synonymy.vessel.dev",
    scheme: "vessel-dev",
  },
  production: {
    name: "Vessel",
    bundleIdentifier: "com.synonymy.vessel",
    scheme: "vessel",
  },
} as const;

const variant = VARIANTS[APP_VARIANT];

// Store uploads need a build number that only goes up. On GitHub Actions the
// workflow run number does that for free; local builds fall back to 1.
const BUILD_NUMBER = Number(process.env.GITHUB_RUN_NUMBER ?? 1);

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: variant.name,
  slug: "vessel",
  owner: "rajmaurya",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: variant.scheme,
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: variant.bundleIdentifier,
    buildNumber: String(BUILD_NUMBER),
    icon: "./assets/expo.icon",
  },
  android: {
    package: variant.bundleIdentifier,
    versionCode: BUILD_NUMBER,
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
    [
      "@kingstinct/react-native-healthkit",
      {
        NSHealthShareUsageDescription:
          "Vessel reads your health data to show your activity and progress.",
        NSHealthUpdateUsageDescription:
          "Vessel saves the activity you log to Apple Health.",
        background: true,
      },
    ],
    "react-native-webgpu",
    [
      "expo-maps",
      {
        // iOS renders Apple Maps, which needs no API key.
        requestLocationPermission: true,
        locationPermission:
          "Vessel uses your location to show where you are on the map.",
      },
    ],
    // Embeds the icon font in the native build; import icons from
    // "@react-native-vector-icons/material-icons/static".
    "@react-native-vector-icons/material-icons",
    [
      "expo-build-properties",
      {
        // react-native-skia v3 renders with Vulkan, which needs Android 8.0+.
        android: { minSdkVersion: 26 },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "69c8b619-4bba-49f2-b2ef-cf56f200b2f9",
    },
  },
});
