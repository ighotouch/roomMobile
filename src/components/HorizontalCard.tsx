import React, {FunctionComponent} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Colors, Fonts} from 'src/common';
import VectorIcon from './VictorIcon';

const HorizontalCard: FunctionComponent<{
  source: number;
  title: string;
  desc: string;
  showArrow?: boolean;
  onPress?: () => void;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}> = ({source, title, desc, onPress, style, imageStyle = {}, showArrow= false, containerStyle={}}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            borderRadius: Fonts.w(10),
            paddingVertical: Fonts.h(13),
            paddingLeft: Fonts.w(12),
            backgroundColor: Colors.white,
            marginBottom: Fonts.h(2),
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.095,
            shadowRadius: 10.84,
            elevation: 2,
          },
          style,
        ]}>
        <Image
          source={source}
          style={[
            {width: Fonts.w(45), height: Fonts.h(45), marginRight: Fonts.w(16)},
            imageStyle,
          ]}
          resizeMode="contain"
        />
        <View style={[{flex: 1,marginRight: Fonts.w(20), paddingTop: Fonts.h(5)}, containerStyle]}>
          <Text
            style={{
              fontSize: Fonts.w(16),
              fontFamily: Fonts.AVERTA_SEMIBOLD,
              color: Colors.defaultText,
            }}>
            {title}
          </Text>
          <Text
            style={{
              marginTop: Fonts.h(4),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(12),
              color: Colors.fineGray,
              lineHeight: Fonts.h(16),
            }}>
            {desc}
          </Text>
        </View>
        <View style={{position: 'absolute', right: Fonts.w(10), marginTop: Fonts.h(20)}}>{!!showArrow && <VectorIcon name="chevron-right-fill" size={20} />}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HorizontalCard;
