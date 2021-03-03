import React, {FunctionComponent} from 'react';
import moment from 'moment';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Fonts} from 'src/common';
import {IAnime} from 'src/interfaces/global';

const AnimeCard: FunctionComponent<{item: IAnime}> = ({item}) => {
  console.log(item);
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
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
        <FastImage
          source={{uri: item.attributes.posterImage.medium}}
          style={{
            width: Fonts.w(84),
            height: Fonts.h(106),
            borderRadius: Fonts.w(10),
            marginRight: Fonts.w(9),
          }}
          resizeMode="center"
        />
        <View>
          <Text
            style={{
              color: Colors.defaultText,
              fontSize: Fonts.w(16),
              fontFamily: Fonts.AVERTA_SEMIBOLD,
            }}>
            Type: {item.type}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginTop: Fonts.h(5),
              color: Colors.pink,
              fontSize: Fonts.w(12),
              width: Fonts.w(220),
              fontFamily: Fonts.AVERTA_REGULAR,
            }}>
            {item.attributes.canonicalTitle}
          </Text>

          <Text
            numberOfLines={3}
            style={{
              marginTop: Fonts.h(5),
              color: Colors.lineBorder,
              width: Fonts.w(220),
              fontSize: Fonts.w(12),
              fontFamily: Fonts.AVERTA_REGULAR,
            }}>
            {item.attributes.description}
          </Text>
          {/* <Text
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
        </Text> */}
          <Text
            style={{
              marginTop: Fonts.h(5),
              color: Colors.lineBorder,
              fontSize: Fonts.w(12),
              fontFamily: Fonts.AVERTA_REGULAR,
            }}>
            {moment(item.attributes.createdAt).format('DD MMM, YYYY')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AnimeCard;
