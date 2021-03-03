import React, {FunctionComponent} from 'react';
import {Image, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors, Fonts} from '../../common';

type Props = {
  subject: string;
  description: string;
  source: string;
};

const SwipeContainer: FunctionComponent<Props> = ({
  source,
  subject,
  description,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // paddingHorizontal: Fonts.w(20),
        // paddingTop: Fonts.h(50),
      }}>
      <View
        style={{
          height: '100%',
          flex: 1,
          width: '100%',
          backgroundColor: '#ffffff',
        }}>
        <LottieView
          source={source}
          style={{backgroundColor: '#ffffff'}}
          autoPlay
          colorFilters={[]}
          // loop
        />
      </View>
      <View
        style={{
          marginTop: Fonts.h(10),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
          borderRadius: Fonts.w(23),
          shadowColor: Colors.inputBorder,
          marginHorizontal: Fonts.h(26),
          marginBottom: Fonts.h(40),
        }}>
        <Text
          style={{
            textAlign: 'center',
            lineHeight: Fonts.h(18),
            fontFamily: Fonts.AVERTA_REGULAR,
            fontSize: Fonts.w(14),
            paddingVertical: Fonts.h(15),
            paddingHorizontal: Fonts.w(37),
            color: Colors.defaultText,
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default SwipeContainer;
