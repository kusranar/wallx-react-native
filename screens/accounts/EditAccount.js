import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Form, Item, Label, Input, Icon, Toast } from 'native-base';
import Account from '../../models/Account';
import axios from 'axios';

import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';
import AsyncStorage from '@react-native-community/async-storage';

var asyncStorage = '';

class EditAccount extends React.Component{
    static navigationOptions = {
        header : null
    }

    constructor(){
        super();
        this.state = {
            cashtag : null
        }
    }

    async componentWillMount(){
        this.setState({cashtag: this.props.navigation.state.params.cashtag});
        asyncStorage = await AsyncStorage.getItem("cif");
    }

    _updateAccount(){
        if(this.state.cashtag == this.props.navigation.state.params.cashtag && this.state.cashtag){
            Toast.show({
                text: "Please Fill Form Correctly!",
                buttonText: "Okay",
                type: "danger"
            });
            this.props.navigation.back();
        } else {
            axios.put(`http://104.248.147.193:8070/customer/account`, 
                new Account(
                    this.props.navigation.state.params.accountNumber,
                    this.props.navigation.state.params.balance,
                    this.state.cashtag,
                    this.props.navigation.state.params.openDate,{
                        idStatusType: this.props.navigation.state.params.idStatusType.idStatusType
                    },
                    {
                        cif: this.props.navigation.state.params.customer.cif
                    }
                )).then( (response) => {
                    response = response.data;
                    if(response.code = '01'){
                        Toast.show({
                            text: "Update Account Success!",
                            buttonText: "Okay",
                            type: "success"
                        })
                        this.props.dispatch(fetchAccounts(asyncStorage));
                        this.props.navigation.navigate('ListAccount');
                    } else {
                        Toast.show({
                            text: "Cashtag Already Exist!",
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch( (error) => {
                    alert('api error edit account');
                })
        }
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
                    <Body><Text style={{color: "white"}}>Update Account</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form style={{marginRight: 20}}>
                        <Item floatingLabel style={{marginLeft: 20}}>
                            <Label>Cashtag</Label>
                            <Input value={this.state.cashtag} onChangeText={(value) => {
                                this.setState({ cashtag : value })
                            }}/>
                        </Item>
                        <Button 
                            full
                            style={{backgroundColor: "orange", marginLeft: 20, marginTop: 10}}
                            onPress={ () => {
                                this._updateAccount();
                            }}>
                            <Text>Update</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(
    mapStateToProps
)(EditAccount);