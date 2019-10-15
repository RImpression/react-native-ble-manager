import React, { Component } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface IProps {
  text?: string,
  color?: "error" | "primary" | "warning" | "success" | "default",
  style?: StyleProp<ViewStyle>
}

const isString = val => typeof val === 'string'

class TextBadge extends Component<IProps> {
  render() {
    const { color, text, children, style } = this.props
    const bgc = {
      error: "#ed4014",
      primary: "#2d8cf0",
      warning: "#ff9900",
      success: "#19be6b",
      default: "#808695"
    }

    const isTextNode = text || isString(children)
    return (
      <View style={[style, styles.textBadge, !isTextNode && styles.textBadgeTop]}>
        <View style={[
          styles.badge,
          { backgroundColor: bgc[color] || bgc.default, },
          !isTextNode && styles.textBadgeTopPoint
        ]}></View>
        {
          isTextNode ? <Text>{text || children}</Text> : children
        }
      </View>
    );
  }
}

export default TextBadge;

const styles = StyleSheet.create({
  textBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  textBadgeTop: {
    alignItems: 'flex-start'
  },
  badge: {
    height: 8,
    width: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  textBadgeTopPoint: {
    transform: [
      { translateY: 6 }
    ]
  }
})