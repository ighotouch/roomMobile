import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from '../Input';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('given a value, Input should display the value as placeholder', () => {
  const placeholderText = 'test-text';
  const {getByText, getAllByText, getByPlaceholderText} = render(
    <Input placeholder={placeholderText} />,
  );

  const element = getByPlaceholderText(placeholderText);

  fireEvent.changeText(element, 'new');

  expect(element).toMatchSnapshot();
});
