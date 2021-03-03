import React, {FunctionComponent} from 'react';
import {KeyboardAvoidingView, View, Platform} from 'react-native';
import {Colors, Fonts} from 'src/common';
import TouchableButton from './TouchableButton';

const StickyBotton: FunctionComponent<{label: string; onPress: () => void}> = ({
  label,
  onPress,
}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Fonts.h(76)}
      enabled={Platform.OS === 'ios'}>
      <View
        style={{
          backgroundColor: Colors.white,
          height: Fonts.h(76),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableButton
          title={label}
          style={{
            paddingVertical: 12,
            width: Fonts.w(336),
            backgroundColor: Colors.blue,
          }}
          onPress={() => {
            if (onPress) onPress();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default StickyBotton;
