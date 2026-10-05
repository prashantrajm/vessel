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
    icon: "./assets/expo.icon",
  },
  android: {
    package: variant.bundleIdentifier,
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
