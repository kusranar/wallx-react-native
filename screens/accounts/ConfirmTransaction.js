import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Separator, Left, Body, Right, Icon, Button, Toast } from 'native-base';
import Axios from 'axios';
import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';
import AsyncStorage from '@react-native-community/async-storage';

import Transaction from '../../models/Transaction';

var asyncStorage = '';

class ConfirmTransaction extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            debit: null,
            credit: null
        }
    }

    async componentDidMount() {
        asyncStorage = await AsyncStorage.getItem("cif");

        await Axios.get(`http://104.248.147.193:8070/customer/account/${this.props.navigation.state.params.accountDebit}`)
            .then((response) => {
                this.setState({ debit: response.data.data })
            })

        await Axios.get(`http://104.248.147.193:8070/customer/accountname/${this.props.navigation.state.params.accountCredit}`)
            .then((response) => {
                if (response.data.code == '01') {
                    this.setState({ credit: response.data.data })
                } else {
                    Axios.get(`http://104.248.147.193:8070/customer/account/${this.props.navigation.state.params.accountCredit}`)
                        .then((response) => {
                            this.setState({ credit: response.data.data })
                        })
                }
            })
    }

    _transfer() {
        let transaction = new Transaction(
            '', this.state.debit.accountNumber, this.state.credit.accountNumber, new Date(), "Transfer", this.props.navigation.state.params.amount, { idTransactionType: 2 }, { idCurrency: 1 }, { idBank: 666 }
        );

        Axios.post('http://104.248.147.193:8070/customer/transaction', transaction)
            .then((response) => {
                if (response.data.code == '01') {
                    Toast.show({
                        text: "Transfer Success!",
                        buttonText: "Okay",
                        type: "success"
                    })
                    this.props.dispatch(fetchAccounts(asyncStorage));
                    this.props.navigation.navigate('ListAccount');
                } else {
                    Toast.show({
                        text: response.data.description,
                        buttonText: "Okay",
                        type: "danger"
                    });
                }
            }).catch((error) => {
                alert('error api transaction account');
            })
    }

    _renderHeader() {
        return (
            <Header style={{ backgroundColor: "orange" }}>
                <Left>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ListAccount');
                    }}
                    >
                        <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                    </TouchableOpacity>
                </Left>
                <Body><Text style={{ color: "white" }}>Cancel Transfer</Text></Body>
                <Right></Right>
            </Header>
        )
    }

    render() {
        if (this.state.credit) {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Separator bordered>
                            <Text>Sender</Text>
                        </Separator>
                        <ListItem>
                            <Body>
                                <Text>{this.state.debit.accountNumber}</Text>
                                <Text note>Account Number</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.debit.cashtag}</Text>
                                <Text note>Cashtag</Text>
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text>Recepient</Text>
                        </Separator>
                        <ListItem>
                            <Body>
                                <Text>{this.state.credit.accountNumber}</Text>
                                <Text note>Account Number</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.credit.cashtag}</Text>
                                <Text note>Cashtag</Text>
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text>Amount</Text>
                        </Separator>
                        <ListItem>
                            <Text>IDR {this.props.navigation.state.params.amount}</Text>
                        </ListItem>
                        <Button
                            full
                            style={{ backgroundColor: "orange" }}
                            onPress={() => {
                                this._transfer();
                            }}>
                            <Text>Transfer</Text>
                        </Button>
                    </Content>
                </Container>
            );
        }

        return (
            <Container>
                {this._renderHeader()}
                <Content>
                    <Text style={{ alignSelf: "center" }}>Your Receiver Not Registered</Text>
                </Content>

            </Container>
        )


    }
}

const mapStateToProps = (state) => ({
});

export default connect(
    mapStateToProps
)(ConfirmTransaction);