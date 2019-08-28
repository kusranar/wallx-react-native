import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, Text, Icon, Form, Item, Label, Picker, Button, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Wallet from '../../models/Wallet';
import { fetchWallets } from '../../redux/actions/Wallet';
import { connect } from 'react-redux';

class CreateWallet extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            walletTypes: [],
            accounts: [],
            idWalletType: null,
            accountNumber: null,
            cif: null
        }
    }

    async componentDidMount() {
        asyncStorage = await AsyncStorage.getItem("cif");
        this.setState({ cif: asyncStorage });

        const self = this;
        axios.get(`http://104.248.147.193:8070/walletType/walletTypes`)
            .then((response) => {
                self.setState({ walletTypes: response.data.data });
            }).catch((error) => {
                alert('error get wallettype');
            })

        axios.get(`http://104.248.147.193:8070/customer/accounts/${asyncStorage}`)
            .then((response) => {
                self.setState({ accounts: response.data.data });
            }).catch((error) => {
                alert('error get account by cif');
            })
    }

    _createWallet() {
        let self = this;
        if (this.state.idWalletType && this.state.accountNumber) {
            let wallet = new Wallet('', new Date(), { idWalletType: this.state.idWalletType }, { accountNumber: this.state.accountNumber }, { cif: this.state.cif });
            axios.post(`http://104.248.147.193:8070/account/walletaccount`, wallet)
                .then((response) => {
                    if (response.data.code == '01') {
                        Toast.show({
                            text: "Create Account Success!",
                            buttonText: "Okay",
                            type: "success"
                        })
                        self.props.dispatch(fetchWallets(this.state.cif));
                        self.props.navigation.goBack();
                    } else {
                        Toast.show({
                            text: "Account Number Is Already Registered!",
                            buttonText: "Okay",
                            type: "danger"
                        })
                    }
                }).catch((error) => {
                    alert('error api create wallet');
                })
        } else {
            Toast.show({
                text: "Please fill form correcly!",
                buttonText: "Okay",
                type: "danger"
            })
        }
    }

    _renderHeader() {
        return (
            <Header style={{ backgroundColor: "orange" }}>
                <Left>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    >
                        <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                    </TouchableOpacity>
                </Left>
                <Body><Text style={{ color: "white" }}>Create Wallet</Text></Body>
                <Right></Right>
            </Header>
        )
    }

    render() {
        if (this.state.accounts == null) {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Text style={{ alignSelf: "center" }}>You dont have account yet</Text>
                    </Content>
                </Container>
            )

        }
        return (
            <Container>
                {this._renderHeader()}
                <Content>
                    <Form style={{ marginRight: 15 }}>
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
                                <Picker.Item label="Choose" />
                                {this.state.walletTypes.map(
                                    (data, key) => <Picker.Item label={data.description} value={data.idWalletType} key={key} />)}
                            </Picker>
                        </Item>
                        <Item>
                            <Label>Select Account</Label>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={this.state.accountNumber}
                                onValueChange={(value) => {
                                    this.setState({ accountNumber: value });
                                }}
                            >
                                <Picker.Item label="Choose" />
                                {this.state.accounts.map(
                                    (data, key) => <Picker.Item label={data.cashtag} value={data.accountNumber} key={key} />)}
                            </Picker>
                        </Item>
                        <Button
                            full
                            style={{ backgroundColor: "orange", marginLeft: 15, marginTop: 15 }}
                            onPress={() => {
                                this._createWallet();
                            }}>
                            <Text>Create Wallet</Text>
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
)(CreateWallet);