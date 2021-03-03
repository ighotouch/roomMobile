import React, {FunctionComponent, useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {RenderProps, RootStackParamList} from './routes';
import {routes} from './routes';
import {RegistrationProvider} from 'src/contexts/registrationStore';
import {LoginProvider} from 'src/contexts/loginContext';
import {Colors} from 'src/common';
import HeadBackButton from 'src/components/HeadBackButton';
import {GlobalProvider} from 'src/contexts/globalContext';

const Stack = createStackNavigator<RootStackParamList>();

export function renderScreen({name, component, options = {}}: RenderProps) {
  return (
    <Stack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
    />
  );
}

const RootNavigation: FunctionComponent = () => {
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      RNBootSplash.hide();
    }, 10);

    return clearTimeout(timer);
  }, []);
  return (
    <LoginProvider>
      <RegistrationProvider>
        <GlobalProvider>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerLeft: () => <HeadBackButton />,
              headerStyle: {
                backgroundColor: Colors.white,
                elevation: 0,
                shadowOpacity: 0,
              },
            }}
            initialRouteName="Intro">
            {routes.map((route) => {
              return renderScreen(route);
            })}
          </Stack.Navigator>
        </GlobalProvider>
      </RegistrationProvider>
    </LoginProvider>
  );
};

export default RootNavigation;
