import React from "react";
import { PureComponent } from "react";
import { BackHandler, Animated, Easing, Platform } from "react-native";
import { Icon } from "@ant-design/react-native";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import { connect } from "react-redux";

import NavigationService from "../utils/navigation";
// components
import IndexDrawerContent from "../components/IndexDrawerContent/IndexDrawerContent";
import defDrawerNavigationOptions from "../components/IndexHeader/defDrawerNavigationOptions";
// pages
import IndexScreen from "../pages/Index/Index";
import Loading from "../pages/Loading/Loading";
import AuthLoading from "../pages/Loading/AuthLoading";
import Login from "../pages/Login/Login";
import Scan from "../pages/Scan/Scan";
import Setting from "../pages/Setting/Setting";
import DeliveryOrderDetails from "../pages/OrderDetails/DeliveryOrderDetails";
import JobOrderConfirm from "../pages/JobOrderConfirm";
import DeliveryOrderTake from "../pages/DeliveryOrderTake";
import DriverOrderInfo from "../pages/Driver/DriverOrderInfo";
import DriverOrderTake from "../pages/Driver/DriverOrderTake";

// 生成路由堆栈
// const IndexStack = createStackNavigator(
//   {
//     Index: {
//       screen: IndexScreen
//     },

//   },
//   {
//     initialRouteName: "Index"
//   }
// );

// IndexStack.navigationOptions = ({ navigation }) => {
//   const router = navigation.state.routes[navigation.state.index]
//   if (router.routeName !== 'Index') return { drawerLockMode: "locked-closed" }
// };
// const MineStack = createStackNavigator({
//   Mine: {
//     screen: MineScreen,
//     navigationOptions: {
//       header: null,
//     },
//   }
// }, {
//     initialRouteName: "Mine",
// });

// 底部tabs
// const TabNavigator = createBottomTabNavigator(
//   {
//     Index: IndexStack,
//     Mine: MineStack
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       const { routeName } = navigation.state;
//       let iconName: 'home' | 'user'
//         let tabName
//         if (routeName === 'Index') {
//           iconName = 'home'
//           tabName = '首页'
//         } else if (routeName === 'Mine') {
//           iconName = 'user'
//           tabName = '我的'
//         }
//       return {
//         tabBarIcon: ({ focused, horizontal, tintColor }) => {
//           return <Icon name={iconName} color={tintColor} size={25}/>
//         },
//         tabBarLabel: tabName
//       }
//     },
//     tabBarPosition: 'bottom',
//     animationEnabled: false,
//     swipeEnabled: false,
//     initialRouteName: 'Index',
//     backBehavior: 'none',
//     lazy: true, // 懒加载
//     tabBarOptions: {
//       activeTintColor: '#E06E59',
//       inactiveTintColor: '#b2b2b2',
//       showIcon: true,
//       showLabel: true,
//       pressColor: '#999',
//       indicatorStyle: {
//         height: 0,
//       },
//       style: {
//         backgroundColor: '#fff',
//       },
//     },
//   }
// );

// TabNavigator.navigationOptions = ({ navigation }) => {
//   return {
//     header: null,
//   }
// }

const drawerRouteConfigMap = {
  Index: IndexScreen,
  Setting
};
const IndexDrawerNavigetor = createDrawerNavigator(drawerRouteConfigMap, {
  contentComponent: IndexDrawerContent,
  contentOptions: {
    inactiveTintColor: "#333",
    style: {
      height: 85
    }
  },
});

//  
IndexDrawerNavigetor.navigationOptions = (data) => {
  const { navigation } = data
  const { routeName } = navigation.state.routes[navigation.state.index];
  const routeConfig = drawerRouteConfigMap[routeName];
  if (
    routeConfig &&
    routeConfig.navigationOptions
  ) {
    const navigationOptions = routeConfig.navigationOptions
    // return navigationOptions(data)
    return {
      // header: () => null
      ...(typeof navigationOptions === 'function' ? navigationOptions(data) : navigationOptions),
      ...defDrawerNavigationOptions
    }
  }
};

// 和tab同层的页面
const MainNavigator = createStackNavigator(
  {
    IndexDrawerNavigetor,
    Scan,
    DeliveryOrderDetails,
    JobOrderConfirm,
    DeliveryOrderTake,
    DriverOrderInfo,
    DriverOrderTake
  },
  {
    initialRouteName: "IndexDrawerNavigetor",
    headerMode: "screen"
  }
);

// 主Navigator
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login }
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

// export const routerReducer = createNavigationReducer(AppNavigator)

// export const routerMiddleware = createReactNavigationReduxMiddleware(
//   'root',
//   state => state.router
// )

const AuthLoadingScreen = createStackNavigator({
  AuthLoadingScreen: AuthLoading
});
const AuthStack = createStackNavigator({ Login });
// 主入口 只导出一个
// const AppContainer = createAppContainer(AppNavigator);
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      app: AppNavigator,
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

type Props = {
  app;
  dispatch;
  router;
};
class Router extends PureComponent<Props> {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    if (currentScreen === "Login") {
      return true;
    }
    if (currentScreen !== "Home") {
      // this.props.dispatch(NavigationActions.back())
      NavigationService.back();
      return true;
    }
    return false;
  };
  render() {
    const { app } = this.props;
    if (app.loading) return <Loading />;

    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default connect(({ app, router }) => ({
  app,
  router
}))(Router);
