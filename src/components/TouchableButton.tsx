import React, {FunctionComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import {Colors, Fonts} from '../common';

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  reverse?: boolean;
  onPress?: () => void;
  transparent?: boolean;
  loading?: boolean;
};

const TouchableButton: FunctionComponent<Props> = ({
  title,
  style,
  reverse = false,
  onPress,
  transparent,
  loading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        reverse
          ? {
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.primaryColor,
            }
          : {
              backgroundColor: transparent
                ? 'transparent'
                : Colors.primaryColor,
            },
        {
          height: Fonts.h(50),
          marginBottom: Fonts.h(10),
          borderRadius: Fonts.w(6),
          paddingVertical: Fonts.h(16),
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <View
        style={{
          // height: transparent ? Fonts.h(24) : Fonts.h(42),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator
            color={reverse ? Colors.primaryColor : Colors.white}
            size={Fonts.h(10)}
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Text
            style={[
              {
                fontFamily: Fonts.AVERTA_SEMIBOLD,
                color: reverse
                  ? Colors.primaryColor
                  : transparent
                  ? Colors.primaryColor
                  : Colors.white,
                fontSize: Fonts.w(14),
              },
              textStyle,
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TouchableButton;
