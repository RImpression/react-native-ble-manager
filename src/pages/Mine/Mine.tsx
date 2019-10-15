import React, { Component } from 'react';
import { View, Text, Linking, Button, Alert, StyleSheet, SafeAreaView } from "react-native";
import { flexBox, mergeStyle, padding, flex } from '../../styles';


// const amp = 'androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2'
// const amp = 'https://www.qq.com'
class Mine extends Component {
  render() {
    const menuList = [
      {name: '我的订单', icon: '', value: '222', isLink: true},
      {name: '软件更新', icon: '', value: ''},
    ]
    return (
      <SafeAreaView>
        <View style={styles.userAara}>
          <View style={styles.userAvatar}>
          </View>
          <View style={styles.userInfo}>
            <View><Text>13511112222</Text></View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Mine;

const styles = StyleSheet.create({
  userAara: mergeStyle(flexBox.centerY, flexBox.justifyStart, padding([10]), {
    backgroundColor: '#4DAAAB',
    height: 150,
  }),
  userAvatar: mergeStyle(flexBox.center, {
    height: 70,
    width: 70,
    backgroundColor: '#f5f5f5',
    borderRadius: 70
  }),
  userInfo: mergeStyle(flexBox.centerY, {
    marginLeft: 15
  })
})