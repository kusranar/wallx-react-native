import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Left, Body, Right, ListItem, Thumbnail, Text, Icon, View } from 'native-base';

export default class ListData extends Component {

    constructor() {
        super();
        this.state = {
            date: null
        }
    }

    componentDidMount(){
        this.setState({date: this.props.data.date.slice(0, 10)});
    }

    render() {
        return (
            <ListItem>
                <Body>
                    <Text>Recepient : {this.props.data.accountCredit}</Text>
                    <Text note>{this.state.date}</Text>
                </Body>
                <Right>
                    <Text>IDR {this.props.data.amount}</Text>
                    <Text note>{this.props.data.transactionType.description}</Text>
                </Right>
            </ListItem>
        )
    }
}