import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LatLng, Region } from './PropTypes';

import Marker from './Marker';

interface LocationStyle {
  image?: string,
  fillColor?: string,
  strokeColor?: string,
  strokeWidth?: number,
}
interface nativeEvent<T> {
  nativeEvent: T
}

interface MapViewProps  {
  mapType?: 'standard' | 'satellite' | 'navigation' | 'night' | 'bus',
  locationStyle?: LocationStyle,
  locationType?: "show" | "locate" | "follow" | "map_rotate" | "location_rotate" | "location_rotate_no_center" | "follow_no_center" | "map_rotate_no_center",
  locationEnabled?: boolean,
  locationInterval?: number,
  distanceFilter?: number,
  showsIndoorMap?: boolean,
  showsIndoorSwitch?: boolean,
  showsBuildings?: boolean,
  showsLabels?: boolean,
  showsCompass?: boolean,
  showsZoomControls?: boolean,
  showsScale?: boolean,
  showsLocationButton?: boolean,
  showsTraffic?: boolean,
  maxZoomLevel?: number,
  minZoomLevel?: number,
  zoomLevel?: number,
  coordinate?: LatLng,
  region?: Region,
  limitRegion?: Region,
  tilt?: number,
  rotation?: number,
  zoomEnabled?: boolean,
  scrollEnabled?: boolean,
  rotateEnabled?: boolean,
  tiltEnabled?: boolean,
  style?: StyleProp<ViewStyle>;

  onPress?: (event: nativeEvent<LatLng>) => void;
  onLongPress?: (event: nativeEvent<LatLng>) => void;
  onLocation?: (event: nativeEvent<LocationNativeEvent>) => void;
  onAnimateFinish?: () => void;
  onStatusChange?: (event: nativeEvent<StatusChangeNativeEvent>) => void;
  onStatusChangeComplete?: (event: nativeEvent<StatusChangeCompleteEvent>) => void;
}

interface LocationNativeEvent extends LatLng{
  timestamp: number,
  speed: number,
  accuracy: number,
  altitude: number,
}

interface StatusEvent {
  rotation: number,
  zoomLevel: number,
  tilt: number,
}

interface StatusChangeNativeEvent extends LatLng, StatusEvent {
}
interface StatusChangeCompleteEvent extends Region, StatusEvent{
}

export class MapView extends React.Component<MapViewProps, any> {
  static Marker: typeof Marker;

  render(): JSX.Element;
}

export { Marker }