import React, {FunctionComponent} from 'react';
import {Image, View, ViewProps, StyleProp, ImageStyle} from 'react-native';

const logo = require('../images/logo.png');
const logoDark = require('../images/logo_dark.png');

const Logo: FunctionComponent<{
  dark?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
}> = ({dark, imageStyle}) => {
  return (
    <View>
      {!!dark ? (
        <Image source={logoDark} style={[imageStyle, {resizeMode: 'contain'}]} />
      ) : (
        <Image source={logo} style={[imageStyle, {resizeMode: 'contain'}]} />
      )}
    </View>
  );
};

export default Logo;
