import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import {View, Modal} from 'react-native';

import LottieView from 'lottie-react-native';
import {Fonts} from 'src/common';

export interface loderRef {
  toggle(): void;
}
const loader = require('../assets/lottie/loader.json');
const LoadingModal: ForwardRefRenderFunction<loderRef, {loading: boolean}> = ({
  loading,
}) => {
  return (
    <Modal
      transparent={true}
      visible={loading}
      onRequestClose={() => {}}
      animationType="fade">
      <View
        style={[
          {
            flex: 1,
            backgroundColor: '#ffffffff',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 93333333333334444444,
          },
        ]}>
        <LottieView
          style={{width: Fonts.w(240)}}
          source={loader}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
};

export default forwardRef(LoadingModal);
