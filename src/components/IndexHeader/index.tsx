import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Flex, Icon } from "@ant-design/react-native";
import navigation from '../../utils/navigation';

interface IProps {}

class IndexHeader extends PureComponent<IProps> {
  render() {
    const {} = this.props;
    return (
      <SafeAreaView style={styles.bg}>
        <Flex justify="between" style={styles.header}>
        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableHighlight style={{ flex: 1 }} activeOpacity={1}>
          <Flex style={styles.searchBar} justify="start" align="center">
            <View style={styles.searchBarIcon}>
              <Icon name="search" />
            </View>
            {/* <TextInput /> */}
            <Flex.Item>
              <Text>搜索任务</Text>
            </Flex.Item>
          </Flex>
        </TouchableHighlight>
        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Scan")}>
          <Icon name="scan" size={30} color="#fff" />
        </TouchableOpacity>
      </Flex>
      </SafeAreaView>
      
    );
  }
}

export default IndexHeader;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#AA824F",
  },
  header: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 44,
    
  },
  iconBox: {
    marginLeft: 8,
    marginRight: 8
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    height: "80%"
    // marginLeft: 5,
    // marginRight: 5,
  },
  searchBarIcon: {
    marginLeft: 8,
    marginRight: 8
  }
});
