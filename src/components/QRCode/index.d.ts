import React from 'react';

interface IQRCodeProps {
  value: string,
  size?: number, // 128
  bgColor?: string, // "#000"
  fgColor?: string, // "#FFF"
}

export default class Marker extends React.Component<IQRCodeProps, any> {
  render(): JSX.Element;
}