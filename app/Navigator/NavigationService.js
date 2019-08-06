import { NavigationActions, StackActions, SwitchActions, DrawerActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function back(routeName) {
  _navigator.dispatch(NavigationActions.back({ routeName }));
}

function setParams(routeName, params) {
  _navigator.dispatch(
    NavigationActions.setParams({
      params,
      key: routeName
    })
  );
}

function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  );
}

function pop(n) {
  _navigator.dispatch(
    StackActions.pop({
      n
    })
  );
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  back,
  setParams,
  push,
  pop,
  popToTop
};
