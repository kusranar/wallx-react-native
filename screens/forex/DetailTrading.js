import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, List, ListItem, Icon, Button } from 'native-base';

export default class DetailWallet extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "orange" }}>
                    <Left>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }
                        }
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{ color: "white" }}>Detail Trading</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Buy Or Sell</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.buySell}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Date</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.date}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Potential Point Lose</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.potensialPoinLose}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Point Lose</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.pointLose}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Amount</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.amount}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Rate</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.rate}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Amount After Sell</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.amountAfterSell}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}