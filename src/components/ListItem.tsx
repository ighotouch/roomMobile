import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MateriaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Fonts} from '../common';

const ListItem: FunctionComponent<{
  text: string;
  icon: string;
  noBorder?: boolean;
  onPress?: () => void;
}> = ({text, icon, noBorder = false, onPress}) => {
  function handleOnPress() {
    if (onPress) onPress();
  }
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={{
          borderBottomWidth: noBorder ? 0 : 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: Colors.indicatorBackground,
          paddingVertical: Fonts.h(14),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: Fonts.w(11),
          }}>
          <Icon name={icon} size={Fonts.w(24)} color={Colors.primaryColor} />
          <Text
            style={{
              marginLeft: Fonts.w(14),
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.darkText,
            }}>
            {text}
          </Text>
        </View>
        <MateriaIcon
          name="chevron-right"
          size={Fonts.w(24)}
          color={Colors.lineBorder}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
