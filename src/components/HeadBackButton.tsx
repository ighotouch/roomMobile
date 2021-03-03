import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import VectorIcon from './VictorIcon';
import {useNavigation} from '@react-navigation/native';
import { Fonts } from 'src/common';

const HeadBackButton: FunctionComponent<{onPress?: () => void}> = ({
  onPress,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }

        navigation.goBack();
      }}>
      <View style={{padding: Fonts.w(10)}}>
        <VectorIcon name="arrow_back" size={Fonts.w(19)} color="#111111" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeadBackButton;
