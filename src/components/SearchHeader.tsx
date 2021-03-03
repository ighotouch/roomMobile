import React, {FunctionComponent, PureComponent, useRef, useState} from 'react';
import {View, Text, TextInput, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from 'src/common';

type Props = {
  onChange: (text: string) => void;
  children?: React.ReactNode;
};

const SearchHeader: FunctionComponent<Props> = ({onChange, children}) => {
  const inputRef = useRef<TextInput>(null);
  const [search, setSearch] = useState<string>('');

  function onSearch(search: string) {
    setSearch(search);
    if (onChange) onChange(search);
  }

  function renderSearchClose() {
    if (search.length) {
      return (
        <TouchableOpacity
          style={{}}
          onPress={() => {
            onSearch('');
            Keyboard.dismiss();
          }}>
          <Icon name="close" style={{}} size={Fonts.w(16)} />
        </TouchableOpacity>
      );
    }
  }

  function renderSearch() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.inputBorder,
          borderRadius: Fonts.w(10),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Fonts.w(18),
          paddingVertical: Fonts.h(11),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Icon name="search" style={{}} size={Fonts.w(19)} />
          <TextInput
            ref={inputRef}
            placeholder="Search"
            placeholderTextColor={Colors.lineBorder}
            style={{
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              paddingLeft: Fonts.w(10),
              paddingRight: Fonts.w(20),
            }}
            value={search}
            keyboardType="default"
            onChangeText={onSearch}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        {renderSearchClose()}
      </View>
    );
  }

  return (
    <View>
      <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        {renderSearch()}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default SearchHeader;
