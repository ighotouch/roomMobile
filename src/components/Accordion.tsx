import React, {FunctionComponent} from 'react';
import {Image, View, Text, ImageBackground} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Colors, Fonts} from 'src/common';
import {ICard} from 'src/interfaces/card';

const cardIcons = {
  verve: require('../images/verve.png'),
  master: require('../images/master.png'),
  visa: require('../images/visa.png'),
};

const even = require('../images/debit_card_visa.png');

const Accordion: FunctionComponent<{
  card: ICard;
  onPress: (item: ICard) => void;
}> = ({card, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(card)}>
      <ImageBackground
        source={even}
        resizeMode="cover"
        style={{
          borderRadius: Fonts.w(20),
          overflow: 'hidden',
          width: '100%',
          height: Fonts.h(133),
        }}>
        <View style={{paddingHorizontal: Fonts.w(32)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: Fonts.h(23),
            }}>
            <View />
            <Image
              source={cardIcons.visa}
              style={{
                width: Fonts.w(51),
                height: Fonts.h(16),
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.AVERTA_SEMIBOLD,
              fontSize: Fonts.w(16),
            }}>
            {`${card.last4} **** **** ****`}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: Fonts.h(10),
            }}>
            <Text></Text>
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.AVERTA_REGULAR,
                fontSize: Fonts.w(13),
              }}>
              Expires
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text></Text>
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.AVERTA_SEMIBOLD,
                fontSize: Fonts.w(16),
              }}>
              {card.expiration_month}/ {card.expiration_year}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Accordion;
