import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Form, Item, Label, Input, Icon, Toast } from 'native-base';
import axios from 'axios';
import Account from '../../models/Account';
import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';
import AsyncStorage from '@react-native-community/async-storage';

class CreateAccount extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        this.state = {
            cashtag : null,
            cif: null
        }
    }

    async componentDidMount(){
        asyncStorage = await AsyncStorage.getItem("cif");
        this.setState({ cif: asyncStorage });
    }    

    _createAccount(){
        let account = new Account (null, null, this.state.cashtag, new Date(), {idStatusType : 1}, {cif : this.props.navigation.state.params});

        if(this.state.cashtag){
            const self = this;
            axios.post(`http://104.248.147.193:8070/customer/account`, account)
                .then( (response) => {
                    if(response.data.data = '01'){
                        Toast.show({
                            text: "Create Account Success!",
                            buttonText: "Okay",
                            type: "success"
                        })
                        self.props.dispatch(fetchAccounts(this.state.cif));
                        this.props.navigation.goBack();
                    } else {
                        Toast.show({
                            text: "Cashtag Already Registered!",
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch( (error) => {
                    alert('error api create account')
                })
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
                                }
                            }
                        >
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </TouchableOpacity>
                    </Left>
                    <Body><Text style={{color: "white"}}>Create Account</Text></Body>
                    <Right></Right>
                </Header>
                <Form style={{marginRight: 20}}>
                    <Item floatingLabel style={{marginLeft: 20}}>
                        <Label>Cashtag</Label>
                        <Input onChangeText={(value) => {
                            this.setState({ cashtag : value })
                        }}/>
                    </Item>
                    <Button 
                        full
                        style={{backgroundColor: "orange", marginLeft: 20, marginTop: 10}}
                        onPress={ () => {
                            this._createAccount();
                        }}>
                        <Text>Create</Text>
                    </Button>
                </Form>
                
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(
    mapStateToProps
)(CreateAccount);