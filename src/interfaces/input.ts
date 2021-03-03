import {
  KeyboardType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface itemType {
  [keys: string]: string;
}

export interface topRightIndicator {
  label: string;
  color: string;
  error?: boolean;
}

export interface inputProps {
  placeholder?: string;
  value?: string;
  label?: string;
  format?: 'amount';
  style?: StyleProp<ViewStyle>;
  secure?: boolean;
  noDecimals?: boolean;
  countDown?: boolean;
  height?: number;
  indicator?: string;
  icon?: number;
  noCheck?: boolean;
  multiline?: boolean;
  editable?: boolean;
  maxLength?: number;
  errorIndicator?: string | null;
  loading?: boolean;
  topRightIndicator?: topRightIndicator | null;
  optional?: boolean;
  showStrength?: boolean;
  validationRules?: string;
  keyboardType?: KeyboardType;
  step?: number;
  text?: string;
  leftIcon?: string;
  onChangeText?: (t: string) => void;
  onChange?: (t: string) => void;
  currencyStyle?: any;
  innerContainerStyle?: any;
  textStyle?: StyleProp<TextStyle>;
  returnKeyType?: string;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  noLabel?: boolean;
  gap?: number;
}
