import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Flex, Icon, WhiteSpace, List } from "@ant-design/react-native";
import { DrawerItems } from "react-navigation";
import { margin } from "../../styles";
import { phoneCall } from "../../utils";
import theme from '../../styles/theme';

const appInfo = require('../../app.json')
const { serverPhone } = appInfo

// const phone = "10010";

// const extraItem = [
//   {
//     key: "kefu",
//     drawerLabel: "联系客服",
//     drawerIcon: ({ inactiveTintColor }) => (
//       <Icon name="phone" color={inactiveTintColor} />
//     ),
//     onItemPress: () => {
//       phoneCall(phone);
//     }
//   }
// ];

const IndexDrawerContent = props => {
  return (
    <ScrollView>
      {/* <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}> */}
        <Flex justify="around" align="center" style={styles.top}>
          <Flex justify="center" align="center" style={styles.avatar}>
            <Icon name="user" size={30} color="#AA824F" />
          </Flex>
          <Flex direction="column" justify="center" align="start" style={styles.info}>
            <Text style={styles.infoText}>张三（13512341234）</Text>
            <Text style={[styles.infoText, styles.label]}>注册骑手</Text>
          </Flex>
        </Flex>
        
        <List renderHeader="服务">
          
          <List.Item extra="100单">站点待配送单</List.Item>
          <List.Item extra="65">即将到站单</List.Item>
          <List.Item
            thumb={<Icon name="phone" color={props.inactiveTintColor} />}
            extra={serverPhone}
            onPress={() => phoneCall(serverPhone)}
          >
            联系客服
          </List.Item>
        </List>

        <WhiteSpace />

        <DrawerItems {...props} />

      {/* </SafeAreaView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    paddingVertical: 10,
    backgroundColor: '#AA824F',
    color: theme.color_text_base_inverse
  },
  avatar: {
    marginHorizontal: 20,
    width: 70,
    height: 70,
    backgroundColor: theme.color_text_base_inverse,
    borderRadius: 70,
  },
  info: {
    width: '50%',
    flex: 1
  },
  infoText: {
    color: theme.color_text_base_inverse,
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    color: '#f5f5f5'
  },
  bottomFullView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default IndexDrawerContent;
