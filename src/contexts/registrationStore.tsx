import * as React from 'react';
import {IRegisterRequest, IRegisterResponse} from 'src/interfaces/global';
import {API} from 'src/network';

const CONTEXT_ERROR =
  'Registration context not found. Have you wrapped your components with RegistrationContext.Consumer?';
type Action ={}

type dispatch = {
  registerUser: (data: IRegisterRequest) => Promise<IRegisterResponse>;
};

const RegistrationStateContext = React.createContext<{} | undefined>(undefined);
const RegistrationDispatchContext = React.createContext<dispatch>({
  registerUser: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

function reducer(prevState: {}, action: Action) {}

function RegistrationProvider({children}: {children: React.ReactNode}) {
  // actions
  const registrationDispatch = React.useMemo(
    () => ({
      registerUser: (data: IRegisterRequest): Promise<IRegisterResponse> => {
        return API.registerUser(data);
      },
    }),
    [],
  );

  return (
    <RegistrationStateContext.Provider value={{}}>
      <RegistrationDispatchContext.Provider value={registrationDispatch}>
        {children}
      </RegistrationDispatchContext.Provider>
    </RegistrationStateContext.Provider>
  );
}

function useRegistrationState(): {} {
  const context = React.useContext(RegistrationStateContext);
  if (context === undefined) {
    throw new Error(
      'useRegistrationState must be used with a registrationProvider',
    );
  }
  return context;
}

function useRegistrationDispatch(): dispatch {
  const context = React.useContext(RegistrationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useRegistrationDispatch must be used with a registrationProvider',
    );
  }
  return context;
}

export {useRegistrationDispatch, useRegistrationState, RegistrationProvider};
