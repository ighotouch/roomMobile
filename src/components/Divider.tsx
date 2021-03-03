import React from 'react';
import {Text, View} from 'react-native';
import {Fonts, Colors} from '../common';

const Divider = ({text}: {text: string}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: Colors.lineBorder}} />
      <Text
        style={{
          marginHorizontal: Fonts.w(21),
          fontFamily: Fonts.AVERTA_SEMIBOLD,
          color: Colors.primaryColor,
          fontSize: Fonts.w(14),
        }}>
        {text}
      </Text>
      <View style={{flex: 1, height: 1, backgroundColor: Colors.lineBorder}} />
    </View>
  );
};

export default Divider;
