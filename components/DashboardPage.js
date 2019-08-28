import React, { Component } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Icon, Thumbnail, Button, Item, Segment, Tab, Tabs, ScrollableTab, TabHeading, H3, Toast } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

import { connect } from 'react-redux';
import { fetchAccounts } from './../redux/actions/Account';
import { fetchCustomer } from './../redux/actions/Customer';
import { fetchAmountForex } from './../redux/actions/AmountForex';
import { createToken } from './../auth/Auth';

var cif = '';
var idTrader = '';

class DashboardPage extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            rupiah: null,
            usd: null,
            accounts: [],
            customer: null,
            amountTrader: null
        }
    }

    async componentDidMount() {
        cif = await AsyncStorage.getItem("cif");
        idTrader = await AsyncStorage.getItem("idtrader");
        this.props.fetchAccounts(cif);
        this.props.fetchCustomer(cif);
        this.props.fetchAmountForex(idTrader)
        // this.props.fetchTrader(asyncStorage);

        // await Axios.get(`http://104.248.147.193:8070/customer/customer/${cif}`)
        //     .then((response) => {
        //         this.setState({ customer: response.data.data });
        //     }).catch((error) => {
        //         alert('customer');
        //     })

        // Axios.get(`http://104.248.147.193:8070/customer/accounts/${asyncStorage}`)
        //     .then((response) => {
        //         self.setState({ accounts: response.data.data });
        //     }).catch((error) => {
        //         alert('accounts');
        //     })

        // await Axios.get(`http://104.248.147.193:8070/trader?cif=${cif}`)
        //     .then( async (response) => {
        //         if(response.data.code == '01'){
        //             await createToken("idtrader", response.data.data.idTrader);
        //             await Axios.get(`http://104.248.147.193:8070/amount?idtrader=${response.data.data.idTrader}`)
        //             .then( (response) => {
        //                 if(response.data.code == '01'){
        //                     this.setState({amountTrader: response.data.data});
        //                 }
        //             })
        //         }
        //     }).catch((error) => {
        //         alert('api trader error');
        //     })
    }

    _view = (keyword) => {
        if (keyword == 'rupiah') {
            this.setState({ rupiah: 'green' })
        } else {
            this.setState({ usd: 'green' })
        }
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    _balanceRupiah() {
        let balance = 0;
        if (this.props.data.accounts) {
            for (i = 0; i < this.props.data.accounts.length; i++) {
                balance += this.props.data.accounts[i].balance;
            }
            return <Text style={{ alignSelf: "center", margin: 5 }}>IDR {balance}</Text>
        }

        return (
            <Text style={{ alignSelf: "center", margin: 5 }}>IDR {balance}</Text>
        )
    }

    _balanceTrader() {
        if (this.props.data.amountForex) {
            return <Text style={{ alignSelf: "center", margin: 5 }}>{this.props.data.amountForex}$</Text>
        }

        return <Text style={{ alignSelf: "center", margin: 5 }}>0$</Text>
    }

    _name() {
        if (this.props.data.customer) {
            return (
                <Text style={{
                    color: "white", fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10, fontSize: 20
                }}>{this.props.data.customer.firstName} {this.props.data.customer.lastName}</Text>
            )
        }
    }

    _date() {
        if (new Date().getHours() > 3 && new Date().getHours() < 13) {
            return (
                <Text style={{
                    color: "white", textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                }}>Good Morning</Text>
            )
        } else if (new Date().getHours() > 12 && new Date().getHours() < 19) {
            return (
                <Text style={{
                    color: "white", textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                }}>Good Afternoon</Text>
            )
        } else {
            return (
                <Text style={{
                    color: "white", textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                }}>Good Night</Text>
            )
        }
    }

    render() {
        console.log('idTrader' + idTrader);
        return (
            <Container style={{ backgroundColor: 'gainsboro' }}>
                <ScrollView>
                    <ImageBackground source={require('./../assets/images/9.jpg')} style={{ width: '100%', height: 166 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Left>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.toggleDrawer();
                                }}>
                                    <Icon style={{ color: "white", fontSize: 30 }} type="MaterialCommunityIcons" name="menu" />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                {this._date()}
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('MessageCustomer');
                                }}>
                                    <Icon style={{ color: "white", fontSize: 30 }} type="MaterialIcons" name="mail-outline" />
                                </TouchableOpacity>
                            </Right>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Body>
                                <Thumbnail style={{ borderColor: "white", borderWidth: 1 }} source={require('./../assets/images/4.jpg')} />
                            </Body>
                        </View>
                        <View style={{ marginTop: 70, alignItems: "center" }}>
                            <Body>
                                {this._name()}
                            </Body>
                        </View>
                    </ImageBackground>
                    <View style={{ marginRight: 20 }}>
                        <Item style={{ marginLeft: 20, marginTop: 10, alignSelf: "center" }}>
                            <TouchableOpacity onPress={ () => {
                                this.props.navigation.navigate('DetailProfile')
                            }}>
                                <Text style={{ fontSize: 20 }}>View Profile</Text>
                            </TouchableOpacity>

                        </Item>
                        <Item style={{ marginLeft: 20, marginTop: 10, alignSelf: "center" }}>
                            <Icon name="logo-buffer"></Icon>
                            <Text style={{ fontSize: 20 }}>Total Balance </Text>
                            <Icon name="logo-buffer"></Icon>
                        </Item>
                    </View>
                    <Tabs renderTabBar={() => <ScrollableTab style={{ height: 100, marginTop: 20, backgroundColor: null }} />}>
                        <Tab
                            heading={
                                <TabHeading style={{ backgroundColor: null }}>
                                    <Thumbnail large source={require('./../assets/images/indonesia.png')}></Thumbnail>
                                </TabHeading>
                            }
                        >
                            {this._balanceRupiah()}
                        </Tab>
                        <Tab
                            heading={
                                <TabHeading style={{ backgroundColor: null }}>
                                    <Thumbnail large source={require('./../assets/images/usa.png')}></Thumbnail>
                                </TabHeading>
                            }
                        >
                            {this._balanceTrader()}
                        </Tab>
                    </Tabs>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => {
        dispatch(fetchAccounts(cif));
    },
    fetchCustomer: () => {
        dispatch(fetchCustomer(cif));
    },
    fetchAmountForex: () => {
        dispatch(fetchAmountForex(idTrader));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);