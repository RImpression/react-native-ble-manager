import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  Icon,
  List,
  Button,
  WingBlank,
  WhiteSpace
} from "@ant-design/react-native";
import { connect } from '../../utils/dva';

const Item = List.Item;

interface IProps {
  dispatch
}

class Setting extends Component<IProps> {
  static navigationOptions = {
    // header: <Text>设置</Text>,
    headerTitle: '设置',
    drawerLabel: "设置",
    // drawerLockMode: "locked-closed",
    drawerIcon: ({ tintColor }) => <Icon name="setting" color={tintColor} />
  };

  onLogout = () => {
    const { dispatch } = this.props
    dispatch({ type: 'user/onLogout' })
  };

  render() {
    return (
      <SafeAreaView>
        <List>
          <Item arrow="horizontal" extra="0.0.1">
            版本更新
          </Item>
        </List>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />

        <WingBlank size="lg">
          <Button
            onPress={this.onLogout}
            style={styles.logoutBtn}
            size="large"
            type="warning"
          >
            退出登录
          </Button>
        </WingBlank>
      </SafeAreaView>
    );
  }
}

export default connect()(Setting);

const styles = StyleSheet.create({
  logoutBtn: {
    // position: 'absolute',
    // bottom: 20
  }
});
