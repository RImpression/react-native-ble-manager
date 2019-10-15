import React from 'react';
import { StyleProp, ViewStyle, Platform } from "react-native";
import { LatLng, Point } from "./PropTypes";

type AndroidColor = "azure" |
  "blue" |
  "cyan" |
  "green" |
  "magenta" |
  "orange" |
  "red" |
  "rose" |
  "violet" |
  "yellow"

type IosColor = "red" | "green" | "purple"
  
interface MarkerProps {
  style?: StyleProp<ViewStyle>,
  coordinate: LatLng,
  title?: string,
  description?: string,
  color?: AndroidColor | IosColor,
  icon?: () => void,
  image?: string,
  opacity?: number,
  draggable?: boolean,
  flat?: boolean,
  zIndex?: boolean,
  anchor?: Point,
  centerOffset?: Point,
  active?: boolean,
  clickDisabled?: boolean,
  infoWindowDisabled?: boolean,

  onPress?: () => void,
  onDragStart?: () => void,
  onDrag?: () => void,
  onDragEnd?: () => void,
  onInfoWindowPress?: () => void,
}

export default class Marker extends React.Component<MarkerProps, any> {
  render(): JSX.Element;
}