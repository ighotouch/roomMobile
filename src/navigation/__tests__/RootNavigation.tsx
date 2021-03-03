import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RootNavigation from '../RootNavigation';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {NavigationContainer} from '@react-navigation/native';

// if its first time the user should see the intro screen
test('given a count value of one, User should see the Intro screen', async () => {
  const result = render(
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>,
  );

  await act(async () => {
    expect(result).toMatchSnapshot();
  });
});
