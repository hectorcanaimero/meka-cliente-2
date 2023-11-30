import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.mekadevelopments.cliente',
  appName: 'Meka',
  webDir: 'www',
  bundledWebRuntime: true,
  loggingBehavior: 'debug',
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchAutoHide: true,
      splashImmersive: false,
      splashFullScreen: false,
      launchShowDuration: 1000,
      backgroundColor: '#000',
      spinnerColor: '#E7B63A',
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: 'splash',
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_ionic_logo',
      iconColor: '#1F1F1F',
      sound: 'beep.wav',
    },
    CapacitorCookies: {
      enabled: true,
    },
    Badge: {
      persist: true,
      autoClear: true
    },
  },
  android: {
    allowMixedContent: true
  },
  cordova: {
  },
  server: {
    // cleartext: true,
    // url: 'http://192.168.1.4:8102',
  },
};

export default config;
