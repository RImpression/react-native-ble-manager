import React from 'react';
// import { SafeAreaView } from "react-native";
import { Icon } from '@ant-design/react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
// import navigation from '../../utils/navigation';
// import { baiduMapDirection, amapDirection } from '../../utils/map';
import OrderIng from './OrderIng';
import OrderFinish from './OrderFinish';
import IndexHeader from '../../components/IndexHeader';

const TopTabNavigator = createMaterialTopTabNavigator({
  OrderIng,
  OrderFinish
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#AA824F',
      height: 40,
    }
  }
})

export default TopTabNavigator;



// const IndexContent = createAppContainer(TopTabNavigator)

TopTabNavigator.navigationOptions = (data) => {
  return {
    header: <IndexHeader />,
    drawerLabel: '首页',
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        color={tintColor}
      />
    ),
  }
}
// export default class Index extends React.Component {
//   render() {
//     return (
//       <SafeAreaView>
//         <IndexContent />
//       </SafeAreaView>
//     )
//   }
// }