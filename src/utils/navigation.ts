import {
  NavigationActions,
  NavigationDispatch,
  DrawerActions,
  StackActions,

  NavigationReplaceActionPayload,
  NavigationResetActionPayload
} from 'react-navigation';

type Tnavigate = {
  dispatch: NavigationDispatch
}
let _navigator: Tnavigate;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params = {}) {
  return _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function back() {
  return _navigator.dispatch(NavigationActions.back());
}

function openDrawer() {
  return _navigator.dispatch(DrawerActions.openDrawer())
}

function toggleDrawer() {
  return _navigator.dispatch(DrawerActions.toggleDrawer())
}

function replace(options: NavigationReplaceActionPayload) {
  return _navigator.dispatch(StackActions.replace(options))
}

function reset(options: NavigationResetActionPayload) {
  return _navigator.dispatch(StackActions.reset(options))
}
// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  back,
  openDrawer,
  replace,
  reset,
  toggleDrawer,
};