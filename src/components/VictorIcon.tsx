import React, {FunctionComponent, PureComponent} from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../assets/icons/selection.json';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Colors, Fonts} from 'src/common';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const VectorIcon: FunctionComponent<{
  size: number;
  name: string;
  focused?: boolean;
  color?: string;
  label?: string;
  style?: StyleProp<TextStyle>;
}> = ({size, name, focused, color, label = '', style}) => {
  return (
    <>
      <Icon
        name={name}
        size={size}
        color={
          focused ? Colors.primaryColor : color ? color : Colors.lineBorder
        }
        {...style}
      />
      {!!label? <Text
        style={{
          color: focused ? Colors.primaryColor : Colors.lineBorder,
          fontSize: Fonts.w(12),
          borderBottomColor: focused ? Colors.primaryColor : Colors.lineBorder,
        }}>
        {label}
      </Text>: null}
    </>
  );
};

export default VectorIcon;
