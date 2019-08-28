import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, Button, Text, Icon, FooterTab, Tabs, Tab, View, List, ListItem } from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import PureChart from 'react-native-pure-chart';

import { connect } from 'react-redux';
import { fetchTradings } from '../../redux/actions/Trading';
import { fetchCurrencies } from '../../redux/actions/Currencies';
import { fetchAmountForex } from '../../redux/actions/AmountForex';
import { fetchAmountTrader } from '../../redux/actions/AmountTrader';
import { fetchTrader } from '../../redux/actions/Trader';

import Loading from './../../components/Loading';
import CurrencyHistory from './CurrencyHistory';
import TradingHistory from './TradingHistory';

var idTrader = null;

class Forex extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            transactionsf: [],
            currencies: [],
            trader: null
        }
    }

    async componentDidMount() {
        cif = await AsyncStorage.getItem("cif");
        idTrader = await AsyncStorage.getItem("idtrader");
        this.props.fetchTradings(idTrader);
        this.props.fetchCurrencies();
        this.props.fetchAmountTrader(cif);
        this.props.fetchAmountForex(idTrader);
        this.props.fetchTrader(cif);

        // await Axios.get(`http://104.248.147.193:8070/trader?cif=${cif}`)
        //     .then(async (response) => {
        //         this.setState({ trader: response.data.data })
        //     }).catch((error) => {
        //         alert(error);
        //     })

        // await Axios.get(`http://104.248.147.193:8070/currencies?description=USD`)
        //     .then((response) => {
        //         this.setState({ currencies: response.data.data });
        //     })

        // await Axios.get(`http://104.248.147.193:8070/transactionf?idtrader=${idTrader}`)
        //     .then((response) => {
        //         this.setState({ transactionsf: response.data.data })
        //     })
    }

    _renderHeader() {
        return (
            <Header style={{ backgroundColor: "orange" }}>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.openDrawer();
                    }}>
                        <Icon style={{ fontSize: 30 }} type="MaterialCommunityIcons" name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Forex</Text>
                </Body>
                <Right></Right>
            </Header>
        )
    }

    // _renderCurrencyHistory() {
    //     let sampleData = [
    //         {
    //             seriesName: 'Buy',
    //             data: this._dataBuy(),
    //             color: 'green'
    //         },
    //         {
    //             seriesName: 'Sell',
    //             data: this._dataSell(),
    //             color: 'red'
    //         }
    //     ]
    //     return (
    //         <Tab tabStyle={{ backgroundColor: "#FF8C00", margin: 1 }} activeTabStyle={{ backgroundColor: "white", margin: 1 }} textStyle={{ color: "white" }} activeTextStyle={{ color: "black" }} heading="Currency History">
    //             <View>
    //                 <List>
    //                     {this.props.data.currencies.map((currency, key) =>
    //                         <CurrencyHistory currency={currency} key={key}></CurrencyHistory>
    //                     )}
    //                 </List>
    //             </View>

    //         </Tab>

    //     )
    // }

    _renderTradingHistory() {
        return (
            <Tab tabStyle={{ backgroundColor: "#FF8C00", margin: 1 }} activeTabStyle={{ backgroundColor: "white", margin: 1 }} textStyle={{ color: "white" }} activeTextStyle={{ color: "black" }} heading="Trading History">
                <List>
                    {this.props.data.tradings.reverse().map((trading, key) => <TradingHistory trading={trading} key={key} navigation={this.props.navigation}></TradingHistory>
                    )}
                </List>
            </Tab>
        )
    }

    _renderAmount() {
        if (this.props.data.amountTrader || this.props.data.amountForex) {
            return (
                <ListItem>
                    <Body>
                        <Text>IDR {this.props.data.amountTrader}</Text>
                        <Text note>Amount Trader</Text>
                    </Body>
                    <Right>
                        <Text>{this.props.data.amountForex}$</Text>
                        <Text note>Amount Forex</Text>
                    </Right>
                </ListItem>
            )
        } else {
            return (
                <ListItem>
                    <Body>
                        <Text>IDR 0</Text>
                        <Text note>Amount Trader</Text>
                    </Body>
                    <Right>
                        <Text>0$</Text>
                        <Text note>Amount Forex</Text>
                    </Right>
                </ListItem>
            )

        }
    }

    _renderChart() {
        let sampleData = [
            {
                seriesName: 'Buy',
                data: this._dataBuy(),
                color: 'green'
            },
            {
                seriesName: 'Sell',
                data: this._dataSell(),
                color: 'red'
            }
        ]

        return (
            <Tab tabStyle={{ backgroundColor: "#FF8C00", margin: 1 }} activeTabStyle={{ backgroundColor: "white", margin: 1 }} textStyle={{ color: "white" }} activeTextStyle={{ color: "black" }} heading="Trading Chart">
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <PureChart data={sampleData} type='line' />
                </View>
                <View>
                    <List>
                        <ListItem>
                            <Body>
                                <Text>IDR {this.props.data.amountTrader}</Text>
                                <Text note>Amount Trader</Text>
                            </Body>
                            <Right>
                                <Text>{this.props.data.amountForex}$</Text>
                                <Text note>Amount Forex</Text>
                            </Right>
                        </ListItem>
                        {this.props.data.currencies.reverse().map((currency, key) =>
                            <CurrencyHistory currency={currency} key={key}></CurrencyHistory>
                        )}
                    </List>
                </View>
            </Tab>
        )
    }

    _renderFooter() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: "orange" }}>
                    <Button onPress={() => {
                        this.props.navigation.navigate('BuyForex', idTrader);
                    }}>
                        <Icon name="arrow-round-down" style={{ color: "white" }} />
                        <Text style={{ color: "white" }}>Buy</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate('SellForex', idTrader);
                    }}>
                        <Icon name="arrow-round-up" style={{ color: "white" }} />
                        <Text style={{ color: "white" }}>Sell</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    _dataBuy() {
        let newDate = '';
        let dataBuy = [];
        for (let i = 0; i < this.props.data.currencies.length; i++) {
            newDate = this.props.data.currencies[i].date.slice(0, 10);
            dataBuy.push({ x: newDate, y: this.props.data.currencies[i].buy })
        }
        return dataBuy;
    }

    _dataSell() {
        let newDate = '';
        let dataSell = [];
        for (let i = 0; i < this.props.data.currencies.length; i++) {
            newDate = this.props.data.currencies[i].date.slice(0, 10);
            dataSell.push({ x: newDate, y: this.props.data.currencies[i].sell })
        }
        return dataSell;
    }

    render() {
        if (this.props.data.trader != null) {
            // if(this.props.data.tredings != null){
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Tabs>
                            {/* {this._renderCurrencyHistory()} */}
                            {this._renderTradingHistory()}
                            {this._renderChart()}
                        </Tabs>
                    </Content>
                    {this._renderFooter()}
                </Container>
            )
            // } else {
            //     return(
            //         <Loading></Loading>
            //     )
            // }
        } else {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Tabs>
                            {/* {this._renderCurrencyHistory()} */}
                            <Tab tabStyle={{ backgroundColor: "#FF8C00", margin: 1 }} activeTabStyle={{ backgroundColor: "white", margin: 1 }} textStyle={{ color: "white" }} activeTextStyle={{ color: "black" }} heading="Trading History">
                                <Text style={{ alignSelf: "center" }}>You dont have trader yet</Text>
                            </Tab>
                            {this._renderChart()}
                        </Tabs>
                    </Content>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchTradings: () => {
        dispatch(fetchTradings(idTrader));
    },
    fetchCurrencies: () => {
        dispatch(fetchCurrencies());
    },
    fetchAmountTrader: () => {
        dispatch(fetchAmountTrader(cif));
    },
    fetchAmountForex: () => {
        dispatch(fetchAmountForex(idTrader));
    },
    fetchTrader: () => {
        dispatch(fetchTrader(cif));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forex);

