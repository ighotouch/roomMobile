import React, {FunctionComponent} from 'react';

import {SafeAreaView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import {Colors, Fonts} from '../../common';
import TouchableButton from '../../components/TouchableButton';
import SwipeContainer from './SwipeContainer';
import {RootStackParamList} from '../../navigation/routes';

const swipeList = [
  {
    source: require('../../assets/lottie/one.json'),
    subject: 'African Leadership Group',
    description:
      'WE ARE ON A MISSION TO CAPTURE ONE OF THE 21ST CENTURY’S GREATEST',
  },
];

type Props = StackScreenProps<RootStackParamList, 'Intro'>;

const Intro: FunctionComponent<Props> = ({navigation}) => {
  function handleOnLogin() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <Swiper
        style={{
          padding: 0,
        }}
        loop={false}
        bounces
        horizontal
        dot={
          <View
            style={{
              width: Fonts.w(11),
              height: Fonts.h(3),
              borderRadius: Fonts.w(5),
              marginHorizontal: Fonts.w(2),
              backgroundColor: '#E1E7EE',
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: Fonts.w(11),
              height: Fonts.h(3),
              marginHorizontal: Fonts.w(2),
              borderRadius: Fonts.w(5),
              backgroundColor: Colors.pink,
            }}
          />
        }>
        {[
          ...swipeList.map((s) => (
            <SwipeContainer
              key={s.subject}
              source={s.source}
              description={s.description}
              subject={s.subject}
            />
          )),
        ]}
      </Swiper>
      <View
        style={{
          marginTop: Fonts.h(30),
          marginBottom: Fonts.h(70),
          paddingHorizontal: Fonts.w(19),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableButton
          title="I'm new here"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={{
            width: Fonts.w(158),
            height: Fonts.h(42),
            borderRadius: Fonts.w(20),
            paddingVertical: Fonts.h(10),
            backgroundColor: Colors.pink,
          }}
        />
        <TouchableButton
          title="We've met before"
          reverse
          style={{
            width: Fonts.w(158),
            height: Fonts.h(42),
            borderRadius: Fonts.w(20),
            paddingVertical: Fonts.h(10),
          }}
          onPress={handleOnLogin}
        />
      </View>
    </SafeAreaView>
  );
};

export default Intro;
