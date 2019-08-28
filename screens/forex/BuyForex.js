import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Text, Button, Item, Label, Input, Icon, Form, Toast } from 'native-base';
import Axios from 'axios';
import { connect } from 'react-redux';
import { fetchTrader } from '../../redux/actions/Trader';
import { fetchTradings } from '../../redux/actions/Trading';
import { fetchAmountForex } from '../../redux/actions/AmountForex';
import { fetchAmountTrader } from '../../redux/actions/AmountTrader';
import AsyncStorage from '@react-native-community/async-storage';

import TransactionForex from './../../models/TransactionForex';

var cif = '';
var idTrader = '';

class BuyForex extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            amount: null
        }
    }

    async componentDidMount(){
        cif = await AsyncStorage.getItem("cif");
        idTrader = await AsyncStorage.getItem("idtrader");
    }

    _buyForex() {
        if (this.state.amount) {
            Axios.post(`http://104.248.147.193:8070/transactionf/trader/buy`, new TransactionForex('', 'Buy', new Date(), null, null, this.state.amount, null, this.state.amount, { idTrader: this.props.navigation.state.params }, { idCurrency: 1}))
                .then( async (response) => {
                    if (response.data.code == '01') {
                        Toast.show({
                            text: 'Buy Success',
                            buttonText: "Okay",
                            type: "success"
                        })
                        await this.props.dispatch(fetchTrader(cif));
                        await this.props.dispatch(fetchTradings(idTrader));
                        await this.props.dispatch(fetchAmountForex(idTrader));
                        await this.props.dispatch(fetchAmountTrader(cif));
                        await this.props.navigation.goBack();
                    } else {
                        Toast.show({
                            text: response.data.description,
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                })
        } else {
            Toast.show({
                text: "Please Fill Form Correctly!",
                buttonText: "Okay",
                type: "danger"
            })
        }

    }

    render() {
        return (
            <Container>
                <Header transparent style={{ backgroundColor: "orange" }}>
                    <Left>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }
                        }
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{ color: "white" }}>Buy Forex</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form style={{ marginRight: 15 }}>
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
                                this._buyForex();
                            }}>
                            <Text>Buy Forex</Text>
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
)(BuyForex);