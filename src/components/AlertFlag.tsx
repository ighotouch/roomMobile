import React, {FunctionComponent} from 'react';
import {View, Text, Image, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Fonts, Colors} from '../common';

const AlertFlag: FunctionComponent<{
  message?: string;
  source?: number;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  type?: 'notice';
  customRender? : any;
}> = ({message, source, textStyle, containerStyle, type, customRender}) => {
  if(customRender){
    return (<View>{customRender}</View>);
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          borderRadius: Fonts.w(10),
          paddingHorizontal: Fonts.w(33),
          paddingVertical: Fonts.h(13),
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.095,
          shadowRadius: 10.84,
          elevation: 2,
        },
        containerStyle,
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {!!source && type === 'notice' ? (
          <View
            style={{
              alignSelf: 'flex-start',
              paddingRight: Fonts.w(13),
              paddingTop: Fonts.h(3),
            }}>
            <Image
              source={source}
              style={{height: Fonts.w(16), width: Fonts.w(16)}}
            />
          </View>
        ) : null}
        <Text
          style={[
            {
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(12),
              lineHeight: Fonts.h(25),
              color: Colors.defaultText,
              marginRight: Fonts.w(3),
            },
            textStyle,
          ]}>
          {message}
        </Text>
        {!!source && type !== 'notice' ? (
          <Image
            source={source}
            style={{height: Fonts.w(30), width: Fonts.w(30)}}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AlertFlag;
