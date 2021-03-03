import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import {
  IJokesResponse,
  IAnimeResponse,
  GlobalState,
} from 'src/interfaces/global';
import {API} from 'src/network';

const CONTEXT_ERROR =
  'Profile context not found. Have you wrapped your components with LoginContext.Consumer?';
type Action =
  | {type: 'SET_BIOMETRY'; data: boolean}
  | {type: 'SET_BIOMETRY_TYPE'; data: boolean | string};

type dispatch = {
  getJokes: () => Promise<IJokesResponse>;
  getAnime: () => Promise<IAnimeResponse>;
  resetBiometry: () => Promise<any>;
  setBiometry: (data: boolean) => Promise<any>;
};

const GlobalStateContext = React.createContext<GlobalState | undefined>(
  undefined,
);
const GlobalDispatchContext = React.createContext<dispatch>({
  getJokes: () => {
    throw new Error(CONTEXT_ERROR);
  },
  getAnime: () => {
    throw new Error(CONTEXT_ERROR);
  },
  resetBiometry: () => {
    throw new Error(CONTEXT_ERROR);
  },

  setBiometry: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

export enum BIOMETRY_TYPE {
  TOUCH_ID = 'TouchID',
  FACE_ID = 'FaceID',
  FINGERPRINT = 'Fingerprint',
  FACE = 'Face',
  IRIS = 'Iris',
}

export const checkBiometrySupport = async (): Promise<null | BIOMETRY_TYPE> => {
  return await Keychain.getSupportedBiometryType();
};

function reducer(prevState: GlobalState, action: Action) {
  switch (action.type) {
    case 'SET_BIOMETRY':
      return {...prevState, biometry: action.data};
    case 'SET_BIOMETRY_TYPE':
      return {...prevState, biometryType: action.data};
  }
}

function GlobalProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = React.useReducer(reducer, {biometry: false});
  // actions
  const GlobalDispatch = React.useMemo(
    () => ({
      getJokes: async (): Promise<IJokesResponse> => {
        const response = await API.getJokes();
        return response;
      },

      getAnime: async (): Promise<IAnimeResponse> => {
        const response = await API.getAnime();
        return response;
      },
      resetBiometry: async () => {
        // set biometry to false
        // check biometry
        dispatch({type: 'SET_BIOMETRY', data: false});
        Keychain.resetGenericPassword();
        AsyncStorage.removeItem('biometrics');
        AsyncStorage.removeItem('biometricPIN');
      },

      setBiometry: async (data: boolean) => {
        if (data) {
          const biometryType = await checkBiometrySupport();
          if (biometryType) {
            dispatch({type: 'SET_BIOMETRY_TYPE', data: biometryType});
          }
        }
      },
    }),
    [state],
  );

  return (
    <GlobalStateContext.Provider value={{}}>
      <GlobalDispatchContext.Provider value={GlobalDispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

function useGlobalState(): GlobalState {
  const context = React.useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used with a LoginProvider');
  }
  return context;
}

function useGlobalDispatch(): dispatch {
  const context = React.useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used with a LoginProvider');
  }
  return context;
}

export {useGlobalDispatch, useGlobalState, GlobalProvider};
