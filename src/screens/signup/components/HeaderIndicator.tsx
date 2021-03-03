import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {Colors, Fonts} from '../../../common';

const HeaderIndicator: FunctionComponent<{step: number}> = ({step}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          height: Fonts.h(4),
          backgroundColor:
            step === 1 ? Colors.primaryColor : Colors.indicatorBackground,
          width: Fonts.w(70),
          borderRadius: Fonts.w(4),
        }}
      />
      <View
        style={{
          height: Fonts.h(4),
          backgroundColor:
            step === 2 ? Colors.primaryColor : Colors.indicatorBackground,
          width: Fonts.w(70),
          marginHorizontal: Fonts.w(5),
          borderRadius: Fonts.w(4),
        }}
      />
      <View
        style={{
          height: Fonts.h(4),
          backgroundColor:
            step === 3 ? Colors.primaryColor : Colors.indicatorBackground,
          width: Fonts.w(70),
          borderRadius: Fonts.w(4),
        }}
      />
    </View>
  );
};

export default HeaderIndicator;
