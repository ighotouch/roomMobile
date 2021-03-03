import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigation';

export const navigationRef: any = React.createRef();

function TheRoom() {
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      RNBootSplash.hide();
    }, 1000);

    // return clearTimeout(timer);
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default TheRoom;
