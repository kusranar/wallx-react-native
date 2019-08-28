import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Icon, Form, Toast, Picker, Item, Label, Input } from 'native-base';
import Axios from 'axios';
import Transaction from '../../models/Transaction';

import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';
import AsyncStorage from '@react-native-community/async-storage';

var asyncStorage = '';

class TransferAccount extends React.Component {

    static navigationOptions={
        header: null
    }

    constructor(){
        super();
        this.state = {
            selected: null,
            recepient: null,
            amount: null
        }
    }

    async componentDidMount(){
        asyncStorage = await AsyncStorage.getItem("cif");
    }

    _transfer() {
        if(this.state.recepient && this.state.amount){
            let transaction = new Transaction(
                '', this.props.navigation.state.params.accountNumber, this.state.recepient, new Date(), "Transfer", this.state.amount, { idTransactionType: 2}, { idCurrency: 1}, { idBank: 666}
            );
            this.props.navigation.navigate('ConfirmTransaction', transaction);
        } else {
            Toast.show({
                text: "Please fill form correctly!",
                buttonText: "Okay",
                type: "danger"
            })
        }
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "orange"}}>
                    <Left>
                        <TouchableOpacity onPress={ () => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{color: "white"}}>Transfer Account</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form style={{ marginRight: 15 }}>
                        <Item floatingLabel>
                            <Label>Recepient</Label>
                            <Input onChangeText={(value) => {
                                this.setState({ recepient: value })
                            }} />
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
                            onPress={ () => {
                                this._transfer();
                            }}>
                            <Text>Transfer</Text>
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
)(TransferAccount);