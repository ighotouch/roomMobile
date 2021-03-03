import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {View, Text, StyleProp, ViewStyle, Keyboard} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Fonts} from 'src/common';
import {checkInputValidation} from 'src/common/Utilities';
import {
  inputData,
  selectInputData,
  customInputData,
} from 'src/interfaces/input';
import Input, {MyInputHandles} from './Input';
import TouchableButton from './TouchableButton';

type selectInputLoad = inputData | (selectInputData & customInputData);
type Props = {
  data: Array<selectInputLoad & customInputData>;
  onInputChanged?: (id: string, text: string) => void;
  innerContainerStyle?: StyleProp<ViewStyle>;
  onInputBlurred?: (id: string) => void;
  noButton?: boolean;
  noPinValidation?: boolean;
  buttonLabel?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onConfirm?: (state: {[key: string]: string}) => void;
  deep?: boolean;
  pinProps?: PinProps;
};

export interface PinProps {
  info: string;
  label: string;
  deep: boolean;
}

export interface formRef {
  submitForm(): void;
}

const Form: ForwardRefRenderFunction<formRef, Props> = (
  {
    data,
    innerContainerStyle,
    onInputChanged,
    onInputBlurred,
    noButton,
    noPinValidation = true,
    buttonLabel,
    buttonStyle,
    onConfirm,
    disabled,
    loading,
  },
  ref,
) => {
  const inputRefs = useRef<{[key: string]: MyInputHandles}>({});

  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<{[key: string]: any}>({});

  function onValueChange(id: string, text: any) {
    setState({
      ...state,
      [id]: text,
    });
    if (onInputChanged) onInputChanged(id, text);
  }

  useImperativeHandle(ref, () => ({
    submitForm() {
      validate();
    },
  }));

  function renderInput(item: selectInputLoad, key: number) {
    const nextItem = data[key + 1];
    const isNextFieldExisting = nextItem;
    console.log(nextItem);

    const isNextFieldAnInput = isNextFieldExisting
      ? nextItem.type === 'input'
      : false;
    const {id} = item;

    return (
      <>
        <Input
          editable={!disabled && !loading}
          innerContainerStyle={innerContainerStyle}
          textStyle={item.props ? item.props.style : {}}
          key={key}
          ref={(input) => {
            if (input) inputRefs.current[id + 'Input'] = input;
          }}
          onChangeText={(t) => onValueChange(id, t)}
          onBlur={() => (onInputBlurred ? onInputBlurred(id) : null)}
          value={state[id] ? state[id] : item.props ? item.props.text : ''}
          returnKeyType={
            isNextFieldExisting && isNextFieldAnInput ? 'next' : 'done'
          }
          blurOnSubmit={
            isNextFieldExisting && isNextFieldAnInput ? false : true
          }
          onSubmitEditing={() => {
            console.log('ldfldfdfdfdf', isNextFieldAnInput);
            if (isNextFieldExisting && isNextFieldAnInput) {
              if (inputRefs?.current[`${nextItem.id}Input`]) {
                inputRefs?.current[`${nextItem.id}Input`]?.focusInput();
                return;
              }

              if (inputRefs?.current[`${nextItem.id}PhoneNumber`]) {
                inputRefs?.current[`${nextItem.id}PhoneNumber`]?.focusInput();
              }
            }
          }}
          {...item.props}
        />

        {item.descripton && (
          <View style={{}}>
            <TouchableWithoutFeedback onPress={item.func}>
              <Text style={{}}>{item.descripton}</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </>
    );
  }

  function returnItemType(
    item: selectInputLoad & customInputData,
    key: number,
  ) {
    if (item) {
      if (
        (item.step && activeStep < item.step) ||
        (item.props?.step && activeStep < item.props?.step)
      ) {
        return;
      }

      switch (item.type) {
        case 'input':
          return renderInput(item, key);

        default:
          return null;
      }
    }
  }

  function renderContent() {
    if (data && data.length) {
      return data.map((item, key) => (
        <View key={key} style={{marginTop: Fonts.h(17)}}>
          {returnItemType(item, key)}
        </View>
      ));
    }
  }

  function validate() {
    Keyboard.dismiss();

    const elementsToValidate: Array<MyInputHandles> = [];

    data.map((item) => {
      if (item) {
        if (
          item.type === 'input' &&
          item.props &&
          item.props.validationRules?.includes('required')
        ) {
          elementsToValidate.push(inputRefs?.current[item.id + 'Input']);
        }
      }
    });

    if (noPinValidation) {
      if (checkInputValidation(elementsToValidate)) {
        if (onConfirm) onConfirm(state);
      }
    } else if (checkInputValidation(elementsToValidate)) {
    }
  }

  function renderButton() {
    if (noButton) return;

    const button = (
      <View style={{paddingTop: Fonts.h(30)}}>
        <TouchableButton
          onPress={validate}
          title={buttonLabel ? buttonLabel : ''}
          style={buttonStyle}
          loading={loading}
        />
      </View>
    );
    return button;
  }

  return (
    <>
      <View
        style={[
          data && data.length > 0
            ? {flexGrow: 1, paddingBottom: Fonts.h(10)}
            : {},
        ]}>
        <View style={{flexGrow: 1}}>{renderContent()}</View>
      </View>
      {!noButton ? renderButton() : null}
    </>
  );
};

export default forwardRef(Form);
