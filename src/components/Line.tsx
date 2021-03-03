import React from 'react';
import {Text, View} from 'react-native';
import {Fonts, Colors} from '../common';

const Line = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 0.3, backgroundColor: Colors.lineBorder}} />
    </View>
  );
};

export default Line;
