import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, List, ListItem, Icon, Button } from 'native-base';

export default class DetailWallet extends React.Component{
    static navigationOptions = {
        header: null
    }
    
    render(){
        return(
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
                    <Body><Text style={{color: "white"}}>Detail Wallet</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                <List>
                        <ListItem itemDivider>
                            <Text>ID Wallet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.idWallet}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Wallet Type</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.walletType.description}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Account</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.account.cashtag}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Open Date</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.navigation.state.params.openDate}</Text>
                        </ListItem>
                    </List>
                    <Button 
                        full
                        style={{backgroundColor: "orange"}}
                        onPress={ () => {
                            this.props.navigation.navigate('EditWallet', this.props.navigation.state.params);
                        }}>
                        <Text>Edit Wallet</Text>
                    </Button>
                </Content>
                
            </Container>
        )
    }
}