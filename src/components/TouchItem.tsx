import React, {FunctionComponent} from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { TouchItemProps } from 'src/interfaces/components';

const TouchItem: FunctionComponent<TouchItemProps> = (props) => {
  const {noFeedback, children, ripple, white, onPress} = props;
  function renderiOS() {
    return (
      <TouchableOpacity
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        activeOpacity={noFeedback ? 1 : 0.6}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  function renderAndroid() {
    let feedback = ripple
      ? TouchableNativeFeedback.Ripple(
          white ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
          true,
        )
      : TouchableNativeFeedback.SelectableBackground();
    return (
      <TouchableNativeFeedback
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        {...props}
        background={feedback}>
        <View {...props}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  function renderNoFeedback() {
    return (
      <TouchableWithoutFeedback
        hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
        {...props}>
        <View {...props}>{props.children}</View>
      </TouchableWithoutFeedback>
    );
  }

  return noFeedback || !onPress
    ? renderNoFeedback()
    : Platform.OS === 'ios'
    ? renderiOS()
    : renderAndroid();
};

export default TouchItem;