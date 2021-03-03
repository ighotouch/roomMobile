import {StackScreenProps} from '@react-navigation/stack';
import React, {FunctionComponent} from 'react';
import {View, Image, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Fonts} from 'src/common';
import ScrollableContainer from 'src/components/ScrollableContainer';
import {RootStackParamList} from 'src/navigation/routes';

const party = require('../../images/party.png');

type Props = StackScreenProps<RootStackParamList, 'Welcome'>;
const Welcome: FunctionComponent<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollableContainer style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
         

          <View>
            <Text>And you’re in! But first...</Text>
            <Image
              source={party}
              style={{
                width: Fonts.w(36),
                height: Fonts.h(36),
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </ScrollableContainer>
    </SafeAreaView>
  );
};
export default Welcome;
