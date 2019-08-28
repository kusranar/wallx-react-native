import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, List, ListItem, Icon, Button } from 'native-base';

export default class DetailAccount extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "orange"}}>
                    <Left>
                        <TouchableOpacity onPress={ () => {
                                    this.props.navigation.goBack();
                                }
                            }
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{color: "white"}}>Account Details</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Account Number</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.accountNumber}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Cashtag</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.cashtag}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Balance</Text>
                        </ListItem>
                        <ListItem>
                            <Text>IDR {this.props.navigation.state.params.balance}</Text>
                        </ListItem>
                    </List>
                    <Button 
                        full
                        style={{backgroundColor: "orange"}}
                        onPress={ () => {
                            this.props.navigation.navigate('EditAccount', this.props.navigation.state.params);
                        }}>
                        <Text>Edit Account</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}