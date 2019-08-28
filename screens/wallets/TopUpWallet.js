import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, Text, Icon, Form, Item, Label, Picker, Button, Input, Toast } from 'native-base';

import axios from 'axios';
import Transaction from '../../models/Transaction';
import { connect } from 'react-redux';
import { fetchWallets } from '../../redux/actions/Wallet';
import { fetchAccounts } from '../../redux/actions/Account';
import AsyncStorage from '@react-native-community/async-storage';

var asyncStorage = '';

class TopUpWallet extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            wallet: null,
            amount: null,
            wallets: [],
            cashtag: null
        }
    }

    async componentDidMount() {
        asyncStorage = await AsyncStorage.getItem("cif");
        this.setState({ wallets: this.props.navigation.state.params });
    }

    _topUp() {
        if (this.state.wallet && this.state.amount) {
            let transaction = new Transaction(
                '', this.state.wallet.account.accountNumber, this.state.wallet.walletType.description, new Date(), "Topup", this.state.amount, { idTransactionType: 1 }, { idCurrency: 1 }, { idBank: 666 }
            );
            console.log(transaction);
            axios.post('http://104.248.147.193:8070/customer/transaction', transaction)
                .then((response) => {
                    if (response.data.code == '01') {
                        Toast.show({
                            text: "Topup Success!",
                            buttonText: "Okay",
                            type: "success"
                        })
                        this.props.dispatch(fetchWallets(asyncStorage));
                        this.props.dispatch(fetchAccounts(asyncStorage));
                        this.props.navigation.goBack();
                    } else {
                        Toast.show({
                            text: response.data.description,
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch((error) => {
                    alert('error api topup wallet');
                })
        } else {
            Toast.show({
                text: "Please Fill Form Correctly!",
                buttonText: "Okay",
                type: "danger"
            })
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
                <Body><Text style={{ color: "white" }}>Topup Wallet</Text></Body>
                <Right></Right>
            </Header>
        )
    }

    render() {
        if (this.props.navigation.state.params.length == 0) {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Text style={{ alignSelf: "center" }}>You dont have wallet yet</Text>
                    </Content>
                </Container>
            )
        }

        return (
            <Container>
                {this._renderHeader()}
                <Content>
                    <Form style={{ marginRight: 15 }}>
                        <Item>
                            <Label>Select Account</Label>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.cashtag}
                                onValueChange={(value) => {
                                    this.setState({ wallet: value });
                                    this.setState({ cashtag: value });
                                }}
                            >
                                <Picker.Item label="Choose" />
                                {this.state.wallets.map(
                                    (data, key) => <Picker.Item label={data.account.cashtag} value={data} key={key} />)}
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
                            style={{ backgroundColor: "orange", marginLeft: 15, marginTop: 15 }}
                            onPress={() => {
                                this._topUp();
                            }}>
                            <Text>Topup Wallet</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(
    mapStateToProps
)(TopUpWallet);