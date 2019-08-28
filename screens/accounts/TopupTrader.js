import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Icon, Form, Picker, Item, Label, Input, Tabs, Toast } from 'native-base';
import Axios from 'axios';
import Transaction from '../../models/Transaction';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';
import { fetchTrader } from '../../redux/actions/Trader';

var asyncStorage = '';

class TransferForex extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            accountNumber: null,
            transactionType: null,
            amount: null,
            data: null
        }
    }

    async componentDidMount() {
        asyncStorage = await AsyncStorage.getItem("cif");
        Axios.get(`http://104.248.147.193:8070/trader?cif=${asyncStorage}`)
            .then((response) => {
                this.setState({ data: response.data.data });
            }).catch((error) => {
                alert('error api get trader');
            })
    }

    _transfer() {
        if (this.state.accountNumber && this.state.amount && this.state.transactionType) {
            let transaction = null;
            if(this.state.transactionType == 'withdraw'){
                transaction = new Transaction(
                    '', this.state.data.idTrader, this.state.accountNumber, new Date(), "Withdraw Trader", this.state.amount, { idTransactionType: 4 }, { idCurrency: 1 }, { idBank: 666 }
                );
            } else {
                transaction = new Transaction(
                    '', this.state.accountNumber, this.state.data.idTrader, new Date(), "Topup Trader", this.state.amount, { idTransactionType: 3 }, { idCurrency: 1 }, { idBank: 666 }
                );
            }

            Axios.post('http://104.248.147.193:8070/customer/transaction', transaction)
                .then((response) => {
                    if (response.data.code == '01') {
                        Toast.show({
                            text: "Success",
                            buttonText: "Okay",
                            type: "success"
                        })
                        this.props.dispatch(fetchAccounts(asyncStorage));
                        this.props.dispatch(fetchTrader(asyncStorage));
                        this.props.navigation.goBack();
                    } else {
                        Toast.show({
                            text: response.data.description,
                            buttonText: "Okay",
                            type: "danger"
                        });
                    }
                }).catch((error) => {
                    alert('error api transaction trader');
                })
        } else {
            Toast.show({
                text: 'Please Fill Form Correctly',
                buttonText: "Okay",
                type: "danger"
            });
        }
    }

    _renderHeader() {
        return (
            <Header style={{ backgroundColor: "orange" }}>
                <Left>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    >
                        <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                    </TouchableOpacity>
                </Left>
                <Body><Text style={{ color: "white" }}>Topup Trader</Text></Body>
                <Right></Right>
            </Header>
        )
    }

    render() {
        if (this.state.data && this.props.navigation.state.params) {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Form style={{ marginRight: 15 }}>
                            <Item>
                                <Label>Transaction Type</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.transactionType}
                                    onValueChange={(value) => {
                                        this.setState({ transactionType: value })
                                    }}>
                                    <Picker.Item label="Choose" />
                                    <Picker.Item label="Top Up Trader" value="topup" />
                                    <Picker.Item label="Withdraw Trader" value="withdraw" />
                                </Picker>
                            </Item>
                            <Item picker style={{ marginLeft: 15 }}>
                                <Label>
                                    Select Account
                                </Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.accountNumber}
                                    onValueChange={(value) => {
                                        this.setState({ accountNumber: value })
                                    }}
                                >
                                    <Picker.Item label="Choose" />
                                    {this.props.navigation.state.params.map(
                                        (data, key) => <Picker.Item label={data.cashtag} value={data.accountNumber} key={key} />)}
                                </Picker>
                            </Item>
                            <Item floatingLabel>
                                <Label>Amount</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ amount: value })
                                }} />
                            </Item>
                            <Button
                                full
                                style={{ marginLeft: 15, marginTop: 15, backgroundColor: "orange" }}
                                onPress={() => {
                                    this._transfer();
                                }}>
                                <Text>Transfer</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            )
        } else {
            if (this.props.navigation.state.params == null) {
                return (
                    <Container>
                        {this._renderHeader()}
                        <Content>
                            <Text style={{ alignSelf: "center" }}>Please Create Account To Topup Trader</Text>
                        </Content>
                    </Container>
                )
            }
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Text style={{ alignSelf: "center" }}>Please Create Trader</Text>
                    </Content>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
});

export default connect(
    mapStateToProps
)(TransferForex);