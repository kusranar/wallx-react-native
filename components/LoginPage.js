import React, { Component } from 'react';
import { View, Form, Picker, Icon, Item, Label, Input, ListItem, Left, Body, Right, Button, Text, Radio, Toast } from 'native-base';
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import { createToken } from './../auth/Auth';

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../models/User';

export default class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            language: "",
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                
                    <View style={{ backgroundColor: "#343a40", flex: 1, margin: 3, flexDirection: "row" }}>
                        <View style={{flex: 1}}></View>
                        <View style={{ flex: 1, justifyContent: "center", marginTop: 10, marginBottom: 10 }}>
                            <Form>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    // placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined, color: "white" }}
                                    selectedValue={this.state.language}
                                    onValueChange={(value) => {
                                        this._selectLanguage(value);
                                    }}
                                >
                                    <Picker.Item label="Indonesia" value="indonesia" />
                                    <Picker.Item label="English" value="english" />
                                </Picker>
                            </Form>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "#343a40", marginLeft: 3, marginRight: 3 }}>
                        <View style={{flex: 1, marginBottom: 5, marginTop: 55}}>
                            <Image source={require('./../assets/images/wallx.png')} style={{height: 150, width: null}}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Form style={{ marginRight: 15 }}>
                                <Item floatingLabel>
                                    <Label style={{color: "white"}}>Username</Label>
                                    <Input onChangeText={(value) => {
                                        this.setState({ username : value })
                                    }}/>
                                </Item>
                                <Item floatingLabel>
                                    <Label style={{color: "white"}}>Password</Label>
                                    <Input secureTextEntry onChangeText={(value) => {
                                        this.setState({ password : value })
                                    }}/>
                                </Item>
                            </Form>
                        </View>
                        <View style={{flex: 1}}>
                            <Button full style={{margin: 15, backgroundColor: "orange"}} onPress={ () => {
                                this._login();
                            }}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                        <View style={{flex: 1}}>
                                <Text style={{alignSelf: "center", color:"white", marginBottom: 20, marginTop: 15}}>OR</Text>
                                <TouchableOpacity onPress={ () => {
                                            this._forgot();
                                        }
                                    }
                                >
                                    <Text style={{alignSelf: "center", color: "orange", marginBottom: 20}}>Forgot Password?</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                        
                    <View style={{ flex: 1, backgroundColor: "#343a40", margin: 3, justifyContent: "center" }}>
                        <Text style={{alignSelf: "center", color: "white", marginTop: 10}}>Dont have an account?
                            
                        </Text>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={ () => {
                                    this._register();
                                }
                            }
                        >
                            <Text style={{color: "orange", marginBottom: 10}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
    
    _login = async () => {
        if(this.state.username && this.state.password){
            let user = new User(null, this.state.username, this.state.password, null, null)
            await axios.post('http://104.248.147.193:8070/user/login', user)
                .then(async (result1) => {
                    const response = result1.data;
                    if (response.code == '01') {
                        if(response.data.idRoleType.idRoleType == '1'){
                            await axios.post('http://104.248.147.193:8070/customer/login', response.data)
                                .then( async (result2) => {
                                    const response = result2.data;
                                    if(response.code == '01'){
                                        await axios.get(`http://104.248.147.193:8070/trader?cif=${response.data.cif}`)
                                            .then( async (result3) => {
                                                if(result3.data.code == '01'){
                                                    await createToken("idtrader", result3.data.data.idTrader);
                                                }
                                                    const login = await createToken("cif", response.data.cif);
                                                    if (login) {
                                                        this.props.navigation.navigate('Dashboard');
                                                    }
                                            })
                                    }
                                }).catch(error => {
                                    alert('customer login error api');
                                });
                        } else {
                            axios.post('http://104.248.147.193:8070/backoffice/login', response.data)
                                .then( async (result2) => {
                                    const response = result2.data;
                                    if(response.code == '01'){
                                        const login = await createToken(this.response.data.cif);
                                        if (login) {
                                            this.props.navigation.navigate('Dashboard');
                                        }
                                    }
                                }).catch(error => {
                                    alert('backoffice login error api');
                                });
                        }
                    } else {
                        Toast.show({
                            text: "Username or password wrong!",
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch(error => {
                    alert('userlogin error api');
                });
        } else {
            Toast.show({
                text: "Please fill form correctly!",
                buttonText: "Okay",
                type: "danger"
            })
        }
    }

    _forgot = () => {
        this.props.navigation.navigate('Forgot');
    }

    _register = () => {
        this.props.navigation.navigate('Register');
    }

    _selectLanguage(value) {
        this.setState({ language: value });
    }
}
