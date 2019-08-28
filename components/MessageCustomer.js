import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Text, List, ListItem, Icon, Button } from 'native-base';

export default class MessageCustomer extends React.Component {
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
                    <Body><Text style={{color: "white"}}>Message</Text></Body>
                    <Right></Right>
                </Header>
                <Content style={{alignSelf: "center"}}>
                    <Text style={{alignSelf: "center"}}>Not Message Yet</Text>
                </Content>
            </Container>
        )
    }
}