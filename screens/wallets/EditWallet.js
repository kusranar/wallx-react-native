import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, Text, Icon, Form, Item, Label, Picker, Button, Toast } from 'native-base';
import axios from 'axios';
import Wallet from '../../models/Wallet';

import { connect } from 'react-redux';
import { fetchWallets } from '../../redux/actions/Wallet';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

var asyncStorage = '';

class EditWallet extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            description: '',
            idWalletType: '',
            walletTypes: []
        }
    }

    async componentWillMount() {
        asyncStorage = await AsyncStorage.getItem("cif");
        this.setState({ description: this.props.navigation.state.params.walletType.description });
        this.setState({ idWalletType: this.props.navigation.state.params.walletType.idWalletType });
        const self = this;
        axios.get(`http://104.248.147.193:8070/walletType/walletTypes`)
            .then((response) => {
                self.setState({ walletTypes: response.data.data });
            }).catch((error) => {
                alert('error api get wallettypes');
            })
    }


    _updateWallet(){
        if(this.props.navigation.state.params.walletType.idWalletType == this.state.idWalletType){
            Toast.show({
                text: 'Please Choose Another',
                buttonText: "Okay",
                type: "danger"
            })
            this.props.navigation.goBack();
        } else {
            Axios.put(`http://104.248.147.193:8070/account/walletaccount`, new Wallet(this.props.navigation.state.params.idWallet, this.props.navigation.state.params.openDate, {idWalletType: this.state.idWalletType}, {accountNumber : this.props.navigation.state.params.account.accountNumber}, {cif: this.props.navigation.state.params.customer.cif}))
            .then( (response) => {
                if(response.data.code == '01'){
                    Toast.show({
                        text: "Update Wallet Success!",
                        buttonText: "Okay",
                        type: "success"
                    })
                    this.props.dispatch(fetchWallets(asyncStorage));
                    this.props.navigation.goBack();
                } else {
                    Toast.show({
                        text: response.data.data.description,
                        buttonText: "Okay",
                        type: "danger"
                    })
                }
            })
        }
        
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
                    <Body><Text style={{ color: "white" }}>Edit Wallet</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form style={{marginRight: 20}}>
                        <Item>
                            <Label>Select Wallet</Label>
                            <Picker

                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.idWalletType}
                                onValueChange={(value) => {
                                    this.setState({ idWalletType: value });
                                }}
                            >
                                {this.state.walletTypes.map(
                                    (data, key) => <Picker.Item label={data.description} value={data.idWalletType} key={key} />)}
                            </Picker>
                        </Item>
                        <Button 
                            full
                            style={{backgroundColor: "orange", marginLeft: 20, marginTop: 10}}
                            onPress={ () => {
                                this._updateWallet();
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
)(EditWallet);