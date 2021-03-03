import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import {SharedPref} from 'src/common/SharedPref';
import {LoginState, LoginValidateSuccessResponse} from 'src/interfaces/login';
import {API} from 'src/network';
import {globalVariables} from 'src/network/globalVariables';

const CONTEXT_ERROR =
  'Login context not found. Have you wrapped your components with LoginContext.Consumer?';
type Action = {type: 'SET_TOKEN'; data: string};

type dispatch = {
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<LoginValidateSuccessResponse>;
};

const LoginStateContext = React.createContext<LoginState | undefined>(
  undefined,
);
const LoginDispatchContext = React.createContext<dispatch>({
  login: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

function reducer(prevState: LoginState, action: Action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {...prevState};
  }
}

function LoginProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = React.useReducer(reducer, {
    token: '',
  });

  // actions
  const LoginDispatch = React.useMemo(
    () => ({
      biometricsLogin: async (biometryType: string) => {},
      login: async (credentials: {
        email: string;
        password: string;
      }): Promise<LoginValidateSuccessResponse> => {
        const response = await API.login({
          ...credentials,
        });
        if (response) {
          globalVariables.accessToken = response?.token;
          Keychain.setGenericPassword(credentials.email, credentials.password);
          SharedPref.storePassword(credentials.password);
          SharedPref.storeUsername(credentials.email);
          SharedPref.storeProfileData({email: credentials.email})
        }

        return response;
      },
    }),
    [state],
  );

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={LoginDispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  );
}

function useLoginState(): LoginState {
  const context = React.useContext(LoginStateContext);
  if (context === undefined) {
    throw new Error('useLoginState must be used with a LoginProvider');
  }
  return context;
}

function useLoginDispatch(): dispatch {
  const context = React.useContext(LoginDispatchContext);
  if (context === undefined) {
    throw new Error('useLoginDispatch must be used with a LoginProvider');
  }
  return context;
}

export {useLoginDispatch, useLoginState, LoginProvider};
