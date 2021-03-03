import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchItem from 'src/components/TouchItem';
import {Colors, Fonts} from '../../common';

const profileIcon = require('../../images/profile-icon.png');
const bellIcon = require('../../images/bell.png');

const DashboardHeader: FunctionComponent<{
  message: string;
  navigation: any;
  onImagePress?: () => void;
  onLogout?: () => void;
}> = ({message, navigation, onImagePress, onLogout}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={onImagePress}>
          <FastImage
            source={profileIcon}
            style={{width: Fonts.w(37), height: Fonts.w(37)}}
          />
        </TouchableWithoutFeedback>

        <Text
          style={{
            marginLeft: Fonts.w(8),
            fontSize: Fonts.w(16),
            fontFamily: Fonts.AVERTA_SEMIBOLD,
            width: Fonts.w(198),
            color: Colors.defaultText,
          }}
          numberOfLines={2}>
          {message}
        </Text>
      </View>

      <View>
        <TouchItem onPress={() => {if(onLogout)onLogout()}}>
          <Text style={{fontFamily: Fonts.AVERTA_SEMIBOLD}}>Logout</Text>
        </TouchItem>
      </View>
    </View>
  );
};

export default DashboardHeader;
