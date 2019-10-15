/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import Router from './router'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {
  userName: string,
  dispatch: any,
};


class App extends Component<Props> {
  componentDidMount() {
    // setTimeout(() => {
    //   this.props.dispatch({type: 'app/hiddenLoading'})
    // }, 4000)
  }
  render() {
    return (
      <Router />
    );
  }
}

export default connect()(App)