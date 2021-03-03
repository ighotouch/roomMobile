import AsyncStorage from '@react-native-community/async-storage';
import { IProfile } from 'src/interfaces/global';

const PROFILE = 'PROFILE';
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';
const CLIENT_ID = 'CLIENT_ID';
const COUNT = 'COUNT';
const PHONE = 'PHONE';
const BIOMETRICS = 'BIOMETRICS';
const OLD_PUSHTOKEN = 'OLD_PUSHTOKEN';
const NOTIFICATIONS = 'NOTIFICATIONS';
const LINKS = 'LINKS';
export const PUSHTOKEN = 'PUSHTOKEN';

export const SharedPref = {
  clearUserData: () => {
    try {
      AsyncStorage.removeItem(PROFILE);
      AsyncStorage.removeItem(USERNAME);
      AsyncStorage.removeItem(PASSWORD);
      AsyncStorage.removeItem(BIOMETRICS);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  deleteProfileData: () => {
    try {
      AsyncStorage.removeItem(PROFILE);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  restoreProfileData: async (): Promise<IProfile | null> => {
    try {
      const data = await AsyncStorage.getItem(PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log('Store read error', error);
      return null;
    }
  },
  storeProfileData: async (data: IProfile) => {
    try {
      return await AsyncStorage.setItem(PROFILE, JSON.stringify(data));
    } catch (error) {
      console.log('Store save error', error);
    }
  },

  deleteUsername: () => {
    try {
      AsyncStorage.removeItem(USERNAME);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  restoreUsername: async (): Promise<string | null> => {
    try {
      const data = await AsyncStorage.getItem(USERNAME);
      return data;
    } catch (error) {
      console.log('Store read error', error);
      return null;
    }
  },
  storeUsername: async (username: string) => {
    try {
      return await AsyncStorage.setItem(USERNAME, username);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  storePassword: async (password: string) => {
    try {
      return await AsyncStorage.setItem(PASSWORD, password);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  deletePassword: () => {
    try {
      AsyncStorage.removeItem(PASSWORD);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  restorePassword: async () => {
    try {
      const data = await AsyncStorage.getItem(PASSWORD);
      return data;
    } catch (error) {
      console.log('Store read error', error);
    }
  },

  storeCount: async (data: any) => {
    try {
      return await AsyncStorage.setItem(COUNT, data);
    } catch (error) {
      console.log('Store save error', error);
    }
  },

  storeBiometrics: async (data: any) => {
    try {
      return await AsyncStorage.setItem(BIOMETRICS, data);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  getBiometrics: async (): Promise<string | null> => {
    try {
      const data = await AsyncStorage.getItem(BIOMETRICS);
      return data;
    } catch (error) {
      console.log('Store read error', error);
      return null;
    }
  },
  getCount: () => {
    try {
      return AsyncStorage.getItem(COUNT);
    } catch (error) {
      console.log('Store read error', error);
    }
  },

  getProfile: async () => {
    try {
      const data = await AsyncStorage.getItem(PROFILE);
      return data;
    } catch (error) {
      console.log('Store read error', error);
    }
  },

  storeOldPushToken: async (data: any) => {
    try {
      return await AsyncStorage.setItem(OLD_PUSHTOKEN, data);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
};
