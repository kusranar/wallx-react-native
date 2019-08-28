import React from 'react';
import { View, SafeAreaView, DrawerItems, TouchableOpacity, Text, Image } from 'react-native';
import { Icon, Container } from 'native-base';

import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createAppContainer, StackActions, NavigationActions, StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './redux/stores/Store';

import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import RegisterPage from './components/RegisterPage';
import ForgotPage from './components/ForgotPage';

import ListAccountScreen from './screens/accounts/ListAccount';
import CreateAccountScreen from './screens/accounts/CreateAccount';
import TransferAccountScreen from './screens/accounts/TransferAccount';
import DetailAccountScreen from './screens/accounts/DetailAccount';
import EditAccountScreen from './screens/accounts/EditAccount';
import TransactionReportScreen from './screens/accounts/TrasactionReport';
import TopupTraderScreen from './screens/accounts/TopupTrader';
import ConfirmTransactionScreen from './screens/accounts/ConfirmTransaction';

import ListWalletScreen from './screens/wallets/ListWallet';
import DetailWalletScreen from './screens/wallets/DetailWallet';
import EditWalletScreen from './screens/wallets/EditWallet';
import CreateWalletScreen from './screens/wallets/CreateWallet';
import TopUpWalletScreen from './screens/wallets/TopUpWallet';

import TraderScreen from './screens/trader/Trader';
import CreateTraderScreen from './screens/trader/CreateTrader';

import ForexScreen from './screens/forex/Forex';
import BuyForexScreen from './screens/forex/BuyForex';
import SellForexScreen from './screens/forex/SellForex';
import DetailTradingScreen from './screens/forex/DetailTrading';
import DetailProfileScreen from './components/DetailProfile';
import MessageCustomerScreen from './components/MessageCustomer';
import Logout from './components/Logout';

const DashboardStack = createStackNavigator({
  Dashboard: { screen: DashboardPage },
  DetailProfile: { screen: DetailProfileScreen },
  MessageCustomer: { screen: MessageCustomerScreen }
});

const AccountStack = createStackNavigator({
  ListAccount: { screen: ListAccountScreen },
  DetailAccount: { screen: DetailAccountScreen },
  EditAccount: { screen: EditAccountScreen },
  CreateAccount: { screen: CreateAccountScreen },
  TransferAccount: { screen: TransferAccountScreen },
  TopupTrader: { screen: TopupTraderScreen },
  TrasactionReport: { screen: TransactionReportScreen },
  ConfirmTransaction: { screen: ConfirmTransactionScreen }
});

const WalletStack = createStackNavigator({
  WalletList: { screen: ListWalletScreen },
  DetailWallet: { screen: DetailWalletScreen },
  EditWallet: { screen: EditWalletScreen },
  CreateWallet: { screen: CreateWalletScreen },
  TopUpWallet: { screen: TopUpWalletScreen }
});

const TraderStack = createStackNavigator({
  Trader: { screen: TraderScreen },
  CreateTrader: { screen: CreateTraderScreen }
})

const ForexStack = createStackNavigator({
  Forex: { screen: ForexScreen },
  BuyForex: { screen: BuyForexScreen },
  SellForex: { screen: SellForexScreen },
  DetailTrading: { screen: DetailTradingScreen }
})

const RootDrawer = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      drawerLabel: "Dashboard",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/dashboard.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  },
  Account: {
    screen: AccountStack,
    navigationOptions: {
      drawerLabel: "Account",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/account.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  },
  Wallet: {
    screen: WalletStack,
    navigationOptions: {
      drawerLabel: "Wallet",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/wallet.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  },
  Trader: {
    screen: TraderStack,
    navigationOptions: {
      drawerLabel: "Trader",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/trader.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  },
  Forex: {
    screen: ForexStack,
    navigationOptions: {
      drawerLabel: "Forex",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/trending.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: "Logout",
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./assets/images/logout.png")}
          resizeMode="contain"
          style={{ width: 20, height: 20, tintColor: tintColor }}
        />
      )
    }
  }
});

const RootSwitch = createSwitchNavigator({
  Login: { screen: LoginPage },
  Forgot: { screen: ForgotPage },
  Register: { screen: RegisterPage },
  Dashboard: { screen: RootDrawer }
},
  {
    initialRouteName: 'Login'
  })

const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer></AppContainer>
      </Provider>
    )
  }
};