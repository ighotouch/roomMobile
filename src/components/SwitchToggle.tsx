import * as React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onColor: string;
  offColor: string;
  label: string;
  onToggle: () => void;
  style: object;
  isOn: boolean;
  labelStyle: object;
  toggleWheelStyle: object;
}

interface DefaultProps {
  onColor: string;
  offColor: string;
  label: string;
  onToggle: () => void;
  style: object;
  isOn: boolean;
  labelStyle: object;
  toggleWheelStyle: object;
}

export default class SwitchToggle extends React.PureComponent<Props> {
  animatedValue = new Animated.Value(0);

  static defaultProps: DefaultProps = {
    onColor: '#4cd137',
    offColor: '#ecf0f1',
    label: '',
    onToggle: () => {},
    style: {},
    isOn: false,
    labelStyle: {},
    toggleWheelStyle: {},
  };

  render() {
    const moveToggle = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    });

    const {
      isOn,
      onColor,
      offColor,
      style,
      onToggle,
      labelStyle,
      label,
      toggleWheelStyle,
    } = this.props;

    const color = isOn ? onColor : offColor;

    this.animatedValue.setValue(isOn ? 0 : 1);

    Animated.timing(this.animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 30,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return (
      <View style={styles.container}>
        {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <TouchableOpacity
          onPress={() => {
            typeof onToggle === 'function' && onToggle();
          }}>
          <View
            style={[styles.toggleContainer, style, {backgroundColor: color}]}>
            <Animated.View
              style={[
                styles.toggleWheelStyle,
                {
                  marginLeft: moveToggle,
                },
                toggleWheelStyle
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 50,
    height: 30,
    marginLeft: 3,
    borderRadius: 15,
    justifyContent: 'center',
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
