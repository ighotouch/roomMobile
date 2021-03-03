import React, {FunctionComponent} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../common';

const TouchableIcon: FunctionComponent<{icon: string}> = ({icon}) => {
  return (
    <View>
      <View style={{paddingHorizontal: Fonts.w(20)}}>
        <Icon name={icon} size={29} color="#4B4B4B" />
      </View>
    </View>
  );
};

export default TouchableIcon;
