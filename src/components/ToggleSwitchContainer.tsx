import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, Switch} from 'react-native';
import {Colors, Fonts} from 'src/common';
import SwitchToggle from './SwitchToggle';

const ToggleSwitchContainer: FunctionComponent<{
  header?: string;
  label?: string;
  value?: boolean;
  inline?: boolean;
  onSwitch?: (v: boolean) => void;
}> = ({header, label, value, onSwitch, inline}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (value) {
      setActive(value);
    }
  }, [value]);

  useEffect(() => {
    console.log(active)
    if (onSwitch) onSwitch(active);
  }, [active]);
  function handleOnToggle() {
    setActive((b) => !b);
  }
  return (
    <View
      style={[
        {
          borderRadius: Fonts.w(10),
          backgroundColor: Colors.white,
          minHeight: Fonts.h(74),
          padding: Fonts.h(20),
        },
        inline
          ? {}
          : {flexDirection: 'row', flex: 1, justifyContent: 'space-between'},
      ]}>
      <View
        style={
          {
            // alignSelf: 'flex-start',
            // width: 'auto',
          }
        }>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: Fonts.w(14),
              color: '#462188',
              fontWeight: '600',
              paddingBottom: Fonts.h(5),
            }}>
            {header}
          </Text>

          {!!inline && (
            <SwitchToggle
              isOn={active}
              onColor={Colors.primaryColor}
              offColor={Colors.lineBorder}
              style={{
                width: Fonts.w(38),
                height: Fonts.h(19),
                borderRadius: Fonts.w(19),
                justifyContent: 'center',
              }}
              toggleWheelStyle={{
                width: Fonts.w(17),
                height: Fonts.w(17),
              }}
              onToggle={handleOnToggle}
            />
          )}
        </View>
        <Text
          style={[
            {
              marginTop: Fonts.h(10),
              fontSize: Fonts.h(10),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.lineBorder,
              lineHeight: Fonts.h(14),
            },
            inline ? {} : {width: Fonts.w(211)},
          ]}>
          {label}
        </Text>
      </View>
      {!inline && (
        <SwitchToggle
          isOn={active}
          onColor={Colors.primaryColor}
          offColor={Colors.lineBorder}
          style={{
            width: Fonts.w(38),
            height: Fonts.h(19),
            borderRadius: Fonts.w(19),
            justifyContent: 'center',
          }}
          toggleWheelStyle={{
            width: Fonts.w(17),
            height: Fonts.w(17),
          }}
          onToggle={handleOnToggle}
        />
      )}
    </View>
  );
};

export default ToggleSwitchContainer;
