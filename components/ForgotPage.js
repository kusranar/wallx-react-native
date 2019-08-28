import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Text, Header, View, Form, Item, Label, Input, Button, Toast } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ForgotPage extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: "#343a40" }}>
                <View style={{ flex: 0.1 }}>
                    <TouchableOpacity onPress={ () => {
                                this._login();
                            }
                        }
                    >
                        <Icon style={{ fontSize: 20, marginLeft: 5, marginTop: 10, color: "white" }} type="FontAwesome" name="chevron-left" />
                    </TouchableOpacity>
                    
                </View>
                <View style={{ flex: 0.5, alignItems: "center" }}>
                    <Icon style={{ fontSize: 111, marginLeft: 5, marginTop: 10, color: "white" }} type="AntDesign" name="lock" />
                    <Text style={{ fontWeight: "bold", color: "orange" }}>Trouble Logging In?</Text>
                    <Text style={{ textAlign: "center", fontSize: 14, color: "white" }}>Enter your username we'll send you a link to get back into your account.</Text>
                </View>
                <View style={{flex: 1}}>
                    <Form style={{marginRight: 15}}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                    </Form>
                    <Button full style={{margin: 15, backgroundColor: "orange"}} onPress={ () => {
                        this._forgot();
                    }}>
                        <Text>Send Login Link</Text>
                    </Button>
                </View>
                <View style={{flex: 0.2}}>
                    <Text style={{alignSelf: "center", color:"white"}}>OR</Text>
                    <TouchableOpacity onPress={ () => {
                                this._register();
                            }
                        }
                    >
                        <Text style={{alignSelf: "center", color: "orange"}}>Create New Account</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }

    _forgot = () => {
        Toast.show({
            text: 'Update Soon',
            buttonText: 'Okay'
        })
        // this.props.navigation.navigate('Login');
    }

    _register = () => {
        this.props.navigation.navigate('Register');
    }

    _login = () => {
        this.props.navigation.navigate('Login');
    }
}