import React from 'react';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Icon, Form, Picker, Label, Item, List, FooterTab } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { fetchWallets } from '../../redux/actions/Wallet';

import ListDataWallet from '../../components/ListDataWallet';
import Loading from '../../components/Loading';

var cif = '';

class ListWallet extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            data: [],
            accountNumber: null,
            cif: ''
        }
    }

    async componentDidMount() {
        asyncStorage = await AsyncStorage.getItem("cif");
        cif = asyncStorage;
        this.props.fetchWallets(asyncStorage);
        // this.state.data = this.props.data.wallets;

        // const self = this;
        // axios.get(`http://104.248.147.193:8070/account/walletaccounts/${asyncStorage}`)
        //     .then((response) => {
        //         self.setState({ data: response.data.data });
        //     }).catch((error) => {
        //         alert(error);
        //     })
    }

    _renderHeader() {
        return (
            <Header style={{ backgroundColor: "orange" }}>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.openDrawer();
                    }}>
                        <Icon style={{ fontSize: 30 }} type="MaterialCommunityIcons" name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Wallets</Text>
                </Body>
                <Right></Right>
            </Header>
        )
    }

    _renderContent() {
        if (this.props.data.wallets.length == '0') {
            return (
                <Text style={{alignSelf: "center"}}>You dont have wallet yet</Text>
            )
        } else {
            return (
                <List>
                    {this.props.data.wallets.map((data, key) => <ListDataWallet key={key} data={data} navigation={this.props.navigation} />)}
                </List>
            )
        }
    }

    _renderFooter() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: "orange" }}>
                    <Button onPress={() => {
                        this.props.navigation.navigate('CreateWallet', this.props.data.wallets);
                    }}>
                        <Icon style={{ color: "white" }} name="add" />
                        <Text style={{ color: "white" }}>New Wallet</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate('TopUpWallet', this.props.data.wallets);
                    }}>
                        <Icon name="arrow-round-down" style={{ color: "white" }} />
                        <Text style={{ color: "white" }}>Top Up</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }


    render() {
        if (this.props.data.fetching) {
            return (
                <Loading></Loading>
            )
        } else {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        {this._renderContent()}
                    </Content>
                    {this._renderFooter()}
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchWallets: () => {
        dispatch(fetchWallets(cif))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListWallet);