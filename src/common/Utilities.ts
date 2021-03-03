import {RefObject} from 'react';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import {MyInputHandles} from 'src/components/Input';

export enum BIOMETRY_TYPE {
  TOUCH_ID = 'TouchID',
  FACE_ID = 'FaceID',
  FINGERPRINT = 'Fingerprint',
  FACE = 'Face',
  IRIS = 'Iris',
}

export const amountFormatter = (text: string) => {
  if (text === undefined) {
    return;
  }

  return text;
};

export const formatMoney = (
  number,
  currency = 'NGN',
  decimals = 2,
  dec_point = '.',
  thousands_sep = ',',
) => {
  if (number === null) {
    return currencies[currency] || currency;
  }
  const value = parseInt(number);
  if (isNaN(value)) {
    return '';
  }
  //return new Intl.NumberFormat('en-US', {style: 'currency', currency: cur}).format(value).replace('NGN', '₦');
  var exponent = '',
    numberstr = number.toString(),
    eindex = numberstr.indexOf('e'),
    temp,
    sign,
    integer,
    fractional,
    i,
    z;
  if (eindex > -1) {
    exponent = numberstr.substring(eindex);
    number = parseFloat(numberstr.substring(0, eindex));
  }
  temp = Math.pow(10, decimals);
  number = Math.round(number * temp) / temp;
  sign = number < 0 ? '-' : '';
  integer = (number > 0
    ? Math.floor(number)
    : Math.abs(Math.ceil(number))
  ).toString();
  fractional = number.toString().substring(integer.length + sign.length);
  fractional =
    decimals > 0 || fractional.length > 1
      ? dec_point + fractional.substring(1)
      : '';
  if (decimals > 0) {
    for (i = fractional.length - 1, z = decimals; i < z; ++i) {
      fractional += '0';
    }
  }
  thousands_sep =
    thousands_sep !== dec_point || fractional.length === 0
      ? thousands_sep
      : null;
  if (thousands_sep !== '') {
    for (i = integer.length - 3; i > 0; i -= 3) {
      integer = integer.substring(0, i) + thousands_sep + integer.substring(i);
    }
  }

  return (
    (currency === 'disable' ? '' : (currencies[currency] || currency) + ' ') +
    sign +
    integer +
    fractional +
    exponent
  );
};

const currencies = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  EUR: '€',
  JPY: '¥',
  CAD: '$',
  ZAR: 'R',
  SGD: '$',
  AUD: '$',
  N: 'N',
};

export const checkInputValidation = (refs: Array<MyInputHandles>) => {
  let errorCounter = 0;
  for (let i = 0; i < refs.length; i++) {
    const element = refs[i];
    if (element) {
      if (element.checkValidation() !== 0) {
        errorCounter++;
      }
    }
  }

  return errorCounter === 0 ? true : false;
};

export const checkBiometrySupport = async (): Promise<null | BIOMETRY_TYPE> => {
  return await Keychain.getSupportedBiometryType();
};

export const checkBiometry = ({
  password,
  biometryType,
  biometry,
}: {
  password: string;
  biometryType: string;
  biometry: string;
}) => {
  if (password) {
    return 'Sign In';
  } else if (biometry && biometryType) {
    return 'Sign in with ' + biometryType;
  }
};
