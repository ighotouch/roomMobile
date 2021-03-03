import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {
  View,
  Modal,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Colors, Fonts} from 'src/common';
import VectorIcon from './VictorIcon';
const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;

const TRANSLATE_VAL = HEIGHT + 50;
const DURATION = 400;

const CONTENT_HEIGHT =
  HEIGHT -
  (Platform.OS === 'android' && StatusBar.currentHeight
    ? StatusBar.currentHeight
    : 0);

type Props = {
  height?: number | null;
  header?: string;
  fullHeight?: boolean;
  bottom?: boolean;
  padding?: boolean;
  call?: boolean;
  noRadius?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export interface sliderRef {
  toggleModal(): void;
  closeModal(): void;
}

const SlideModal: ForwardRefRenderFunction<sliderRef, Props> = (
  {bottom, padding, call, height, fullHeight, children, header, onClose,noRadius},
  ref,
) => {
  const maskAnimation = useRef(new Animated.Value(0)).current;
  const modalAnimation = useRef(new Animated.Value(TRANSLATE_VAL)).current;
  const [modalVisible, setmodalVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [active, setActive] = useState(false);
  const [fullStyle, setFullStyle] = useState<any>({
    maxHeight: WINDOW.height * 0.9,
  });

  useEffect(() => {
    if (fullHeight) {
      const normalHeight = {maxHeight: WINDOW.height * 0.9};
      const fullHeightValue = {
        bottom: bottom ? HEIGHT / 3 : 0,
        width: padding ? '90%' : '100%',
        marginBottom: padding ? 14 : 0,
        height: call ? 120 : height ? height : HEIGHT,
      };

      setFullStyle(fullHeightValue);
    }
  }, [fullHeight]);

  useEffect(() => {
    if (active) {
      if (visible) {
        animate();
      } else {
        animate();
      }

      const timer = setTimeout(
        () => {
          setmodalVisible((showing) => !showing);
        },
        visible ? 0 : DURATION,
      );
      return () => {
        clearTimeout(timer);
      };
    }
  }, [visible, active]);

  useImperativeHandle(ref, () => ({
    toggleModal() {
      if (!active) setActive(true);

      toggle(true);
    },
    closeModal() {
      toggle(false);
    },
  }));

  function requestClose() {
    // if(onClose) onClose(false)
    toggle(true);
  }

  function animate() {
    Animated.parallel([
      Animated.timing(modalAnimation, {
        toValue: visible ? 0 : TRANSLATE_VAL,
        easing: Easing.inOut(Easing.exp),
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(maskAnimation, {
        toValue: visible ? 1 : 0,
        duration: DURATION,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // if (!visible) {
      //   setActive(true);
      // }
    });
  }

  function toggle(abort: boolean) {
    Keyboard.dismiss();
    // if(onPress) onPress(!visible)
    setVisible((prev) => !prev);
  }

  function renderHeader() {
    if (header) {
      return (
        <SafeAreaView
        forceInset={{top: fullHeight? 'always': 'never', bottom: 'never'}}
          style={{
            
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: Fonts.w(10),
            paddingLeft: Fonts.w(20),
            paddingTop: Fonts.h(13),
          }}>
          <Text
            style={{
              fontFamily: Fonts.AVERTA_SEMIBOLD,
              fontSize: Fonts.w(16),
              color: Colors.primaryColor,
            }}>
            {header}
          </Text>
          <TouchableOpacity onPress={() => toggle(true)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: Fonts.h(10),
              }}>
              <VectorIcon
                name="close"
                size={Fonts.w(27)}
                color={Colors.darkText}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  }

  const normalHeight = {maxHeight: WINDOW.height * 0.9};
  const fullHeightValue = {
    bottom: bottom ? HEIGHT / 3 : 0,
    width: padding ? '90%' : '100%',
    marginBottom: padding ? 14 : 0,
    height: call ? 120 : height ? height : HEIGHT,
  };

  console.log()

  return (
    <Modal visible={modalVisible} transparent onRequestClose={requestClose}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: CONTENT_HEIGHT,
          position: 'absolute',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (onClose) onClose();
            toggle(true);
          }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.75)',
              },
              {opacity: maskAnimation},
            ]}></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              
              backgroundColor: 'white',
              width: '100%',
              position: 'absolute',
              zIndex: 1,
              overflow: 'hidden',
              alignSelf: 'center',
              borderTopLeftRadius: noRadius? 0:Fonts.w(21),
              borderTopRightRadius: noRadius? 0:Fonts.w(21),
              bottom: 0,
              flexShrink: 1,
              borderTopEndRadius: noRadius? 0:Fonts.w(21),
            },

            // {
            //   bottom: bottom ? HEIGHT / 3 : 0,
            //   width: padding ? '90%' : '100%',
            //   marginBottom: padding ? 14 : 0,
            //   height: call ? 120 : height ? height : HEIGHT,
            // },
            fullStyle,
            {transform: [{translateY: modalAnimation}]},
          ]}>
          {renderHeader()}
          <SafeAreaView
            forceInset={{top: 'never', bottom: 'always'}}
            style={{
              flexShrink: 1,
              flex: 1,
              backgroundColor: Colors.white,
              // paddingBottom: Fonts.h(30),
            }}>
            {children}
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default forwardRef(SlideModal);
