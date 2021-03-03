import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from 'src/navigation/routes';
import {Colors, Fonts} from '../common';
import ListItem from './ListItem';

const ListCard: FunctionComponent<{
  title: string;
  items?: Array<{text: string; icon: string; route: keyof RootStackParamList}>;
}> = ({title, items}) => {
  console.log(items,"LLLLLLLHHHHHH")
  const navigation = useNavigation();
  function renderItems() {
    if (items) {
      return items.map((item, index) => {
        return (
        <ListItem
          key={`${index}${item.text}`}
          icon={item.icon}
          text={item.text}
          noBorder={index === items.length - 1}
          onPress={() => {
            if (item.route) navigation.navigate(item.route);
          }}
        />
      )});
    }
  }
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: Fonts.w(10),
        shadowColor: '#000000',
        elevation: 2,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.07,
      }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.indicatorBackground,
          paddingBottom: Fonts.h(13),
          paddingHorizontal: Fonts.w(11),
          paddingTop: Fonts.h(19),
        }}>
        <Text
          style={{
            fontFamily: Fonts.AVERTA_SEMIBOLD,
            fontSize: Fonts.w(16),
            color: Colors.darkText,
          }}>
          {title}
        </Text>
      </View>
      {renderItems()}
    </View>
  );
};

export default ListCard;
