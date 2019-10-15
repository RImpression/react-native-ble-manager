import React from "react";
import { TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from "react-native";

interface IButtonProps extends TouchableOpacityProps {
  accessibilityLabel?: string;
  allowFontScaling?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  disabledContainerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  styleDisabled?: StyleProp<TextStyle>;
  childGroupStyle?: StyleProp<ViewStyle>;
}

/**
 * @see https://github.com/ide/react-native-button
 */
export default class Button extends React.Component<IButtonProps> {
  render(): JSX.Element;
}
