import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Icon, Form, Item, Label, Picker, List } from 'native-base';
import ListTransaction from './../../components/ListTransaction';
import Axios from 'axios';

export default class TransactionReport extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        Axios.get(`http://104.248.147.193:8070/customer/transaction/${this.props.navigation.state.params.accountNumber}`)
            .then((response) => {
                this.setState({ transactions: response.data.data });
            }).catch((error) => {
                alert('error api transaction report');
            })
    }

    _renderTransactions() {
        if(this.state.transactions.length > 0){
            return (
                <List>
                    {this.state.transactions.reverse().map((data, key) => <ListTransaction key={key} data={data} navigation={this.props.navigation} />)}
                </List>
            )
        } else {
            return (
                <Text style={{alignSelf: "center"}}>You dont have transaction yet</Text>
            )
        }
        
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "orange" }}>
                    <Left>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{ color: "white" }}>Transaction Report</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    {this._renderTransactions()}
                </Content>
            </Container>
        )
    }
}