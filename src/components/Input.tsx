import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {inputProps} from 'src/interfaces/input';
import {Fonts, Colors} from '../common';
import {InputIndicators} from '../common/Contants';
import VectorIcon from './VictorIcon';

const visibleIcon = require('../images/md-eye-off.png');

export interface MyInputHandles {
  focusInput(): void;
  checkValidation(): number;
}

// type Ref = RefObject<TextInput>
const Input: ForwardRefRenderFunction<MyInputHandles, inputProps> = (
  {
    placeholder,
    value,
    format,
    label,
    style = {},
    secure = false,
    indicator,
    icon,
    noCheck,
    validationRules,
    optional,
    multiline,
    height,
    showStrength,
    loading,
    errorIndicator,
    onChangeText,
    onChange,
    confirmation,
    noDecimals,
    countDown,
    editable,
    maxLength,
    topRightIndicator,
    keyboardType,
    textStyle,
    noLabel,
    leftIcon,
    onSubmitEditing
  },
  ref,
) => {
  const inputRef = useRef<TextInput>(null);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [secureTextVisible, setSecureTextVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loaded) handleValidationCheck();
  }, [value, text, loaded, topRightIndicator, loading]);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef?.current?.focus();
    },
    checkValidation: () => {
      let errorCount = validate();
      return errorCount;
    },
  }));

  // useEffect(() => {
  //   if (value && onChange) {
  //     onChange(value);
  //   }
  // }, [value]);

  function formatNumber(n: any) {
    if (n == null || n == undefined) {
      return '';
    }
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function amountFormatter(input_val: any) {
    if (input_val === undefined) {
      return;
    }

    const decimal_pos = input_val.indexOf('.');
    if (decimal_pos >= 0 && !noDecimals) {
      let left_side = input_val.substring(0, decimal_pos);
      let right_side = input_val.substring(decimal_pos);
      left_side = formatNumber(left_side);
      right_side = formatNumber(right_side);
      right_side = right_side.substring(0, 2);
      input_val = left_side + '.' + right_side;
    } else {
      input_val = noDecimals
        ? formatNumber(input_val.replace(/\./g, ''))
        : formatNumber(input_val);
    }
    return input_val;
  }

  function handleOnChangeText(text: string) {
    let t = text;
    if (format === 'amount') {
      t = amountFormatter(text);
    }
    setLoaded(true);
    if (onChangeText) onChangeText(t);
    if (onChange) onChange(t);
    setText(t);
  }

  function handleValidationCheck() {
    if (noCheck) {
      return;
    }
    setError(false);
    setErrorMessage('');
    // Validate
    validate();
  }

  function validate(): number {
    if (validationRules) {
      const rules = validationRules.split('|');
      const errors = rules.filter((type: string) => validationSwitch(type));
      // show error
      if (errors && errors.length > 0) {
        setError(true);
      }
      return errors.length;
    }

    const error = validationSwitch();

    if (error) {
      setError(true);
      return 1;
    }

    return 0;
  }

  function validationSwitch(type?: string) {
    if (value && value.length > 0) {
      if (topRightIndicator && topRightIndicator.error) {
        setError(true);
        setErrorMessage('Required');
        return true;
      }
      if (type?.trim() === 'number') {
        const number = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/;
        if (!number.test(value || '') && value != '') {
          setError(true);
          setErrorMessage('Not a valid number');
          return true;
        }
      }

      if (format === 'amount') {
        const amt = parseFloat(value || '');
        if (!(amt > 0)) {
          setError(true);
          setErrorMessage('Not a valid amount');
          return true;
        }
      }

      if (type?.trim().includes('length')) {
        const v = type?.trim().split(':');

        if (value.length < parseInt(v[1])) {
          setError(true);
          setErrorMessage(`At least ${v[1]} char`);
          return true;
        }
      }

      // case 'min4':
      //   if (this.props.text.length < 4) {
      //     this.setState({
      //       error: true,
      //       userError: this.buildError('4 characters required'),
      //     });
      //     return true;
      //   }
      //   break;

      if (type?.trim() === 'confirm') {
        if (value !== confirmation && value != '') {
          setError(true);
          setErrorMessage('Does not match');
          return true;
        }
      }

      if (type?.trim() === 'email') {
        const mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mail.test(value)) {
          setError(true);
          setErrorMessage('Not a valid email');
          return true;
        }
      }

      if (type?.trim() === 'phone') {
        const numberPhone = /^(\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*$/;
        if (
          (!numberPhone.test(value) && value != '') ||
          (value.length < 11 && value.length > 15)
        ) {
          setError(true);
          setErrorMessage('Not a valid phone number');
          return true;
        }
      }

      if (type?.trim() === 'password') {
        let no = 0;
        if (value.length <= 5) {
          {
            setPasswordStrength(0);
            setErrorMessage('Should be greater than 5');
            return true;
          }
        }

        // If the password length is greater than 6 and contain any lowercase alphabet or any number or any special character
        if (
          value.length > 6 &&
          (value.match(/[a-z]/) ||
            value.match(/\d+/) ||
            value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))
        ) {
          setPasswordStrength(1);
        }

        // If the password length is greater than 6 and contain alphabet,number,special character respectively
        if (
          value.length > 6 &&
          ((value.match(/[a-z]/) && value.match(/\d+/)) ||
            (value.match(/\d+/) &&
              value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) ||
            (value.match(/[a-z]/) &&
              value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)))
        ) {
          setPasswordStrength(2);
        }

        // If the password length is greater than 6 and must contain alphabets,numbers and special characters
        if (
          value.length > 6 &&
          value.match(/[a-z]/) &&
          value.match(/\d+/) &&
          value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)
        ) {
          setPasswordStrength(3);
        }

        // return true;
      }
    }

    if (type?.trim() === 'required') {
      if (!value) {
        setError(true);
        setErrorMessage('Required');
        return true;
      }
    }

    if (loading) {
      setError(true);
      setErrorMessage('Loading');
      return true;
    }

    return false;
  }

  function onBlur() {
    if (value) {
    }
  }

  function focusInput() {
    inputRef?.current?.focus();
  }

  function renderRightComponent() {}

  function renderTopRightIndicator() {
    if (topRightIndicator && value && value.length > 1) {
      return (
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: Fonts.w(8),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(11),
              color: topRightIndicator.color,
            }}>
            {topRightIndicator?.label}
          </Text>
        </TouchableOpacity>
      );
    }

    if (errorIndicator && !secure) {
      return (
        <TouchableOpacity style={{flexDirection: 'row'}}>
          {/* <Image source={visibleIcon} /> */}
          <Text
            style={{
              marginLeft: Fonts.w(8),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(11),
              color:
                indicator === InputIndicators.AVAILABLE
                  ? Colors.green
                  : Colors.red,
            }}>
            {errorIndicator}
          </Text>
        </TouchableOpacity>
      );
    }
    if (error && !secure) {
      return (
        <TouchableOpacity style={{flexDirection: 'row'}}>
          {/* <Image source={visibleIcon} /> */}
          <Text
            style={{
              marginLeft: Fonts.w(8),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(11),
              color:
                indicator === InputIndicators.AVAILABLE
                  ? Colors.green
                  : Colors.red,
            }}>
            {errorMessage}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  function amountBlur() {
    let input_val = value;
    if (input_val === '' || input_val === undefined) {
      return;
    }
    const decimal_pos = input_val.indexOf('.');
    const left_side = input_val.substring(0, decimal_pos);
    let right_side = input_val.substring(decimal_pos);
    if (noDecimals) return;
    if (decimal_pos >= 0) {
      right_side += '00';
      right_side = right_side.substring(0, 3);
      input_val = left_side + '.' + right_side;
    } else {
      input_val += '.00';
    }
    handleOnChangeText(input_val);
  }

  function renderBottomRightIndicator() {
    if (errorIndicator) {
      return (
        <TouchableOpacity style={{flexDirection: 'row'}}>
          {/* <Image source={visibleIcon} /> */}
          <Text
            style={{
              marginLeft: Fonts.w(8),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(11),
              color:
                indicator === InputIndicators.AVAILABLE
                  ? Colors.green
                  : Colors.red,
            }}>
            {errorIndicator}
          </Text>
        </TouchableOpacity>
      );
    }
    if (error) {
      return (
        <TouchableOpacity style={{flexDirection: 'row'}}>
          {/* <Image source={visibleIcon} /> */}
          <Text
            style={{
              marginLeft: Fonts.w(8),
              fontFamily: Fonts.AVERTA_REGULAR,
              fontSize: Fonts.w(11),
              color:
                indicator === InputIndicators.AVAILABLE
                  ? Colors.green
                  : Colors.red,
            }}>
            {errorMessage}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View style={style}>
        {!noLabel && (
          <View
            style={{
              marginBottom: Fonts.h(8),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: Fonts.w(2),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: Fonts.AVERTA_REGULAR,
                  fontSize: Fonts.w(13),
                  color: Colors.darkText,
                }}>
                {label}
              </Text>

              {!!optional && (
                <Text
                  style={{color: Colors.primaryColor, marginLeft: Fonts.w(4)}}>
                  (Optional)
                </Text>
              )}
            </View>

            {!!secure && (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setSecureTextVisible((s) => !s);
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image source={visibleIcon} />
                  <Text
                    style={{
                      marginLeft: Fonts.w(8),
                      fontFamily: Fonts.AVERTA_SEMIBOLD,
                      fontSize: Fonts.w(12),
                      color: Colors.lineBorder,
                    }}>
                    {secureTextVisible ? 'Hide' : 'Show'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {renderTopRightIndicator()}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            // height: Fonts.h(50),
            width: '100%',
            borderColor: error ? Colors.red : Colors.inputBorder,
            alignItems: 'center',
            borderRadius: Fonts.w(10),
            backgroundColor: editable ? Colors.white : "#F2F6F9",
            paddingLeft: Fonts.w(8),
            ...(multiline && height ? {height: Fonts.h(height)} : {}),
            ...(multiline
              ? {paddingVertical: Fonts.h(10), alignItems: 'flex-start'}
              : {}),
          }}>
          {!!leftIcon && <VectorIcon name={leftIcon} size={Fonts.w(20)} />}
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor="#7F91A8"
            editable={editable}
            autoCapitalize="none"
            style={[
              {
                // height: '100%',
                paddingVertical: Fonts.h(16),
                alignItems: 'center',
                flex: 1,
                paddingHorizontal: Fonts.w(12),
                fontSize: Fonts.w(14),
                fontFamily: Fonts.AVERTA_REGULAR,
                color: Colors.darkText,
                // height: Fonts.h(50),
              },
              textStyle,
            ]}
            blurOnSubmit={false}
            keyboardType={keyboardType}
            underlineColorAndroid="transparent"
            spellCheck={false}
            multiline={multiline}
            autoCorrect={false}
            maxLength={maxLength}
            onSubmitEditing={() => {
              if(onSubmitEditing)onSubmitEditing()}}
            // textAlignVertical="top"
            secureTextEntry={secure ? !secureTextVisible : false}
            value={value}
            onChangeText={handleOnChangeText}
          />
          {!!icon && !loading ? (
            <Image
              source={icon}
              style={{
                width: Fonts.w(24),
                height: Fonts.w(24),
                marginRight: Fonts.w(12),
              }}
            />
          ) : loading ? (
            <ActivityIndicator
              style={{
                width: Fonts.w(24),
                height: Fonts.w(24),
                marginRight: Fonts.w(12),
              }}
            />
          ) : null}
        </View>

        {!!multiline && maxLength && countDown &&  (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: Fonts.h(5),
              padding: Fonts.h(5),
            }}>
            {maxLength && (
              <Text
                style={{
                  color: Colors.defaultText,
                }}>
                {maxLength} characters
              </Text>
            )}
            {countDown && (
              <Text
                style={{
                  color: Colors.defaultText,
                }}>
                {value? value.length: 0}
              </Text>
            )}
          </View>
        )}
        {!!secure ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: Fonts.h(0),
              alignItems: 'center',
              height: Fonts.h(16),
            }}>
            <View>
              {!!showStrength && !!value?.length && value?.length > 0 && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: Fonts.h(4),
                      width: Fonts.w(142),
                      borderRadius: Fonts.w(6),

                      backgroundColor:
                        passwordStrength === 1 || passwordStrength === 0
                          ? Colors.red
                          : passwordStrength === 2
                          ? Colors.yellow
                          : Colors.green,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.AVERTA_REGULAR,
                      color: Colors.lineBorder,
                      fontSize: Fonts.w(12),
                      marginLeft: Fonts.w(12),
                    }}>
                    {passwordStrength === 1 || passwordStrength === 0
                      ? 'Weak'
                      : passwordStrength === 2
                      ? 'Medium'
                      : 'Strong'}
                  </Text>
                </View>
              )}
            </View>

            {renderBottomRightIndicator()}
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default forwardRef(Input);
