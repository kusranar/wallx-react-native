import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Form, Item, Label, Input, View, Icon, Button, DatePicker, Picker, Toast } from 'native-base';
import axios from 'axios';

import Customer from './../models/Customer';
import User from '../models/User';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCard: "",
            firstName: "",
            lastName: "",
            birthDate: "",
            gender: "female",
            address: "",
            phone: "",
            email: "",
            mother: "",
            occupation: "",
            salary: "> Rp 5.000.000",
            username: "",
            password: "",
            registerDate: "",
            checkIdCard: false,
            checkUsername: false
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#343a40" }}>
                <ScrollView>
                    <View style={{ flex: 0.05 }}>
                        <TouchableOpacity onPress={() => {
                            this._login();
                        }
                        }
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, marginTop: 10, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./../assets/images/wallx.png')} style={{ height: 150, width: null }} />
                    </View>
                    <View>
                        <Form style={{ marginRight: 15 }}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <Item floatingLabel style={{flex: 1, marginLeft: 15}}>
                                    <Label style={{ color: "white" }}>ID Card</Label>
                                    <Input onChangeText={(value) => {
                                        this.setState({ idCard: value })
                                    }} />
                                </Item>
                                <Button 
                                    small 
                                    style={{marginTop: 20, backgroundColor: "orange"}}
                                    onPress={ () => {
                                        this._check('idcard');
                                    }}>
                                    <Text>Check</Text>
                                </Button>
                            </View>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>First Name</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ firstName: value })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Last Name</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ lastName: value })
                                }} />
                            </Item>
                            <View style={{ marginTop: 30, marginLeft: 15, marginBottom: -20, flexDirection: "row", }}>
                                <Label style={{ color: "white" }}>Birthdate</Label>
                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date(1991, 1, 1)}
                                    maximumDate={new Date(2111, 1, 1)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select Date"
                                    placeHolderTextStyle={{ marginTop: -10 }}
                                    onDateChange={
                                        (value) => {
                                            let newValue = value.toJSON().slice(0, 10)
                                            this.setState({ birthDate: newValue })
                                        }
                                    }
                                    disabled={false}
                                />
                            </View>
                            <Item picker style={{marginLeft: 15, marginTop: 30}}>
                                <Label style={{ color: "white" }}>Gender</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.gender}
                                    onValueChange={(value) => {
                                        this.setState({gender : value})
                                    }}
                                >
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Male" value="male" />
                                </Picker>
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Address</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ address: value })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Phone</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ phone: value })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Email</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ email: value })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Mother</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ mother: value })
                                }} />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Occupation</Label>
                                <Input onChangeText={(value) => {
                                    this.setState({ occupation: value })
                                }} />
                            </Item>
                            <Item picker style={{marginLeft: 15, marginTop: 30}}>
                                <Label style={{ color: "white" }}>Salary</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="black"
                                    selectedValue={this.state.salary}
                                    onValueChange={(value) => {
                                        this.setState({salary : value})
                                    }}
                                >
                                    <Picker.Item label="> Rp 5.000.000" value="> Rp 5.000.000" />
                                    <Picker.Item label="> Rp 5.000.000 < Rp 10.000.000" value="> Rp 5.000.000 < Rp 10.000.000" />
                                    <Picker.Item label="> Rp 10.000.000" value="> Rp 10.000.000" />
                                </Picker>
                            </Item>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <Item floatingLabel style={{flex: 1, marginLeft: 15}}>
                                    <Label style={{ color: "white" }}>Username</Label>
                                    <Input onChangeText={(value) => {
                                        this.setState({ username: value })
                                    }} />
                                </Item>
                                <Button 
                                    small
                                    style={{backgroundColor: "orange", marginTop: 20}}
                                    onPress={ () => {
                                        this._check('username');
                                    }}>
                                    <Text>Check</Text>
                                </Button>
                            </View>
                            
                            <Item floatingLabel>
                                <Label style={{ color: "white" }}>Password</Label>
                                <Input secureTextEntry onChangeText={(value) => {
                                    this.setState({ password: value })
                                }} />
                            </Item>
                        </Form>
                        <Button full style={{ margin: 15, backgroundColor: "orange" }} onPress={this._register}>
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container >
        )
    }

    _check = async (keyword) => {
        if(keyword == 'idcard'){
            if(!this.state.idCard){
                Toast.show({
                    text: "ID Card Invalid!",
                    buttonText: "Okay",
                    type: "danger"
                })
            } else {
                axios.post(`http://104.248.147.193:8070/customer/checkidcard`, new Customer("", this.state.idCard, "", "", "", "", "", "", "", "", "", "", {idUser: ""}, {idImage: ""}))
                .then( (response) => {
                    if(response.data.code == '01'){
                        this.setState({checkIdCard: true});
                        Toast.show({
                            text: "ID Card Valid!",
                            buttonText: "Okay",
                            type: "success"
                        })
                    } else {
                        this.setState({checkIdCard: false});
                        Toast.show({
                            text: "ID Card Invalid!",
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch( (error) => {
                    alert('error api customer checkidcard');
                } )
            }
        } else {
            if(!this.state.username){
                Toast.show({
                    text: "Username Invalid!",
                    buttonText: "Okay",
                    type: "danger"
                })
            } else {
                await axios.get(`http://104.248.147.193:8070/user/?username=${this.state.username}`)
                    .then( (response) => {
                        if(response.data.code == '01'){
                            this.setState({checkUsername: true});
                            Toast.show({
                                text: "Username Valid!",
                                buttonText: "Okay",
                                type: "success"
                            })
                        } else {
                            this.setState({checkUsername: false});
                            Toast.show({
                                text: "Username Invalid!",
                                buttonText: "Okay",
                                type: "danger"
                            })
                        }
                    }).catch( (error) => {
                        alert('error api user checkusername');
                    })
            }   
        }
    }

    _register = async () => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        await this._check('idcard');
        await this._check('username');
        if(
            this.state.idCard &&
            this.state.firstName &&
            this.state.lastName &&
            this.state.birthDate &&
            this.state.gender &&
            this.state.address &&
            this.state.phone &&
            this.state.email &&
            this.state.mother &&
            this.state.occupation &&
            this.state.salary &&
            this.state.username &&
            this.state.password &&
            this.state.checkIdCard &&
            this.state.checkUsername ){
                // const user = {
                //     idUser : "",
                //     username : this.state.username,
                //     password : this.state.password,
                //     idRoleType : {
                //         idRoleType : "1"
                //     },
                //     registerDate: new Date()
                // }

                axios.post('http://104.248.147.193:8070/user/registration', new User('', this.state.username, this.state.password, new Date(), {idRoleType : "1"}, ))
                    .then(async (result) => {
                        const response = result.data;
                        console.log(JSON.stringify(response));
                        if (response.code == '01') {
                            // const customer = {
                            //     cif: "",
                            //     idCard: this.state.idCard,
                            //     firstName: this.state.firstName,
                            //     lastName: this.state.lastName,
                            //     birthDate: this.state.birthDate,
                            //     gender: this.state.gender,
                            //     address: this.state.address,
                            //     phone: this.state.phone,
                            //     email: this.state.email,
                            //     mother: this.state.mother,
                            //     occupation: this.state.occupation,
                            //     salary: this.state.salary,
                            //     idUser: {
                            //         idUser: response.data.idUser
                            //     },
                            //     idImage: {
                            //         idImage: "1"
                            //     },
                            //     countCif: ""
                            // }
                            axios.post('http://104.248.147.193:8070/customer/registration', new Customer(
                                '', this.state.idCard, this.state.firstName, this.state.lastName, this.state.birthDate, this.state.gender, this.state.address, this.state.mother, this.state.phone, this.state.occupation, this.state.salary, '', { idUser: response.data.idUser}, {idImage: "1"}, ''
                            ))
                            Toast.show({
                                text: "Create Account Succcess",
                                buttonText: "Okay",
                                type: "success"
                            })
                            this.props.navigation.navigate('Login');
                        } else {
                            Toast.show({
                                text: "Please fill form correcly!",
                                buttonText: "Okay",
                                type: "danger"
                            })
                        }
                    }).catch( (error) => {
                        alert('error api registration customer');
                    });
            } else {
                Toast.show({
                    text: "Please Fill Form Correcly",
                    buttonText: "Okay",
                    type: "danger"
                })
            }
    }

    _login = () => {
        this.props.navigation.navigate('Login');
    }
}