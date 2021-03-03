import React, {
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../common';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  stickyHeaderIndices?: Array<number>;
};

export interface ScrollRef {
  scrollToBottom(): void;
}
const ScrollableContainer: ForwardRefRenderFunction<ScrollRef, Props> = (
  {
    children,
    style = {},
    noPadding = false,
    containerStyle = {},
    stickyHeaderIndices,
  },
  ref,
) => {
  const scrollRef = useRef<any>(null);


  // console.log(scrollRef.current)

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      // console.log("LLKKKKKKKKKKKKKKKKKK")
      scrollRef.current.scrollToEnd(true)
    },
  }));

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={[{backgroundColor: Colors.background}, style]}
      contentContainerStyle={[
        noPadding ? {} : {padding: Fonts.w(20)},
        containerStyle,
      ]}
      alwaysBounceHorizontal={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          // console.log("dkfjdfjkjk")
        }
      }}
      scrollEventThrottle={400}
      stickyHeaderIndices={stickyHeaderIndices}
      extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
      enableOnAndroid={true}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default forwardRef(ScrollableContainer);
