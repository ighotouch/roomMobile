import React, {
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  View,
  Text,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts} from 'src/common';
import TouchItem from './TouchItem';

const DURATION = 300;

type Props = {
  height?: number;
  noBorderRadius?: boolean;
  color?: string;
  borderGray?: string;
  colorBorder?: string;
  data: Array<{
    text: string;
    icon?: string;
  }>;
  onChange: (index: number) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export interface tabRef {
  onTabPress(index: number): void;
}

const AnimatedTabs: ForwardRefRenderFunction<tabRef, Props> = (
  {noBorderRadius, color, data, style = {}, onChange, onLayout},
  ref,
) => {
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const [width, setWidth] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {}, [width]);
  function renderIndicator() {
    const positionX = {
      transform: [{translateX: indicatorPosition}, {scaleX: scaleAnimation}],
    };

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width,
            height: Fonts.h(31),
            justifyContent: 'center',
            borderRadius: noBorderRadius ? 0 : Fonts.w(10),
            backgroundColor: color ? color : Colors.primaryColor,
            marginHorizontal: Fonts.w(2),
          },
          positionX,
        ]}
      />
    );
  }

  useImperativeHandle(ref, () => ({
    onTabPress: (index) => {
      itemSelected(index);
    },
  }));

  function moveIndicator(pos: number) {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.3,
          duration: DURATION / 3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: DURATION / 3,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(indicatorPosition, {
        toValue: pos,
        duration: DURATION,
        easing: Easing.inOut(Easing.circle),
        useNativeDriver: true,
      }),
    ]).start();
  }

  function itemSelected(index: number) {
    moveIndicator(index * width);
    setActiveItem(index);
    if (onChange) onChange(index);
  }

  function renderItems() {
    return data.map((item, index) => {
      return (
        <TouchItem
          key={index}
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              paddingVertical: Fonts.h(9),
              paddingHorizontal: Fonts.w(5),
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => itemSelected(index)}>
          {/* <Icon
            name={item.icon}
            style={[
              styles.icon,
              {color: activeItem === index ? white : primaryColor},
            ]}
          /> */}
          <Text
            style={{
              textAlign: 'center',
              color: activeItem === index ? Colors.white : Colors.defaultText,
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(14),
            }}>
            {item.text}
          </Text>
        </TouchItem>
      );
    });
  }

  function handleOnLayout(e: LayoutChangeEvent) {
    const newWidth = e.nativeEvent.layout.width / data.length;
    // setHeight(e.nativeEvent.layout.height);
    setWidth(newWidth);
    if (width > 0) {
      if (activeItem === 0) return;
      moveIndicator(newWidth);
    }
    if (typeof onLayout === 'function') {
      onLayout(e);
    }
  }

  return (
    <View
      style={[
        {
          marginVertical: 10,
          marginTop: 0,
          backgroundColor: Colors.white,
          borderRadius: Fonts.w(10),
          borderWidth: 0.5,
          borderColor: Colors.inputBorder,
          padding: 0,
          justifyContent: 'center',
          // justifyContent: height ? 'flex-end' : null,
        },
        style,
      ]}>
      {renderIndicator()}
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: Fonts.w(10),
            overflow: 'hidden',
            height: Fonts.h(35),
          },
        ]}
        onLayout={handleOnLayout}>
        {renderItems()}
      </View>
    </View>
  );
};

export default forwardRef(AnimatedTabs);
