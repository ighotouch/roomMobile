import React, {FunctionComponent} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {Colors, Fonts} from 'src/common';
import {IJoke} from 'src/interfaces/global';

const JokeCard: FunctionComponent<{item: IJoke}> = ({item}) => {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: Colors.white,
          borderRadius: Fonts.w(10),
          shadowColor: Colors.inputBorder,
          elevation: 2,
          marginHorizontal: Fonts.w(20),
          shadowOffset: {
            width: 0,
            height: 3,
          },
          marginVertical: Fonts.h(5),
          shadowRadius: 15,
          shadowOpacity: 0.7,
          paddingVertical: Fonts.h(9),
          paddingHorizontal: Fonts.h(9),
        }}>
        <Text
          style={{
            color: Colors.defaultText,
            fontSize: Fonts.w(16),
            fontFamily: Fonts.AVERTA_SEMIBOLD,
          }}>
          Type: {item.type}
        </Text>
        <Text
          style={{
            marginTop: Fonts.h(5),
            color: Colors.lineBorder,
            fontSize: Fonts.w(12),
            fontFamily: Fonts.AVERTA_REGULAR,
          }}>
          {item.setup}
        </Text>

        <Text
          style={{
            marginTop: Fonts.h(5),
            color: Colors.defaultText,
            fontSize: Fonts.w(15),
            fontFamily: Fonts.AVERTA_SEMIBOLD,
          }}>
          <Text
            style={{
              color: Colors.pink,
              fontFamily: Fonts.AVERTA_REGULAR,
            }}>
            PunchLine:{' '}
          </Text>
          {item.punchline}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default JokeCard;
