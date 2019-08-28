import React from 'react';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, Button, Icon, FooterTab, List, ListItem, Form, Picker, ActionSheet } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { fetchAccounts } from '../../redux/actions/Account';

import ListDataAccount from '../../components/ListDataAccount';
import Loading from '../../components/Loading';

var asyncStorage = '';

class ListAccount extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        // const self = this;
        asyncStorage = await AsyncStorage.getItem("cif");
        this.props.fetchAccounts(asyncStorage);
        // axios.get(`http://104.248.147.193:8070/customer/accounts/${asyncStorage}`)
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
                    <Text style={{ color: "white", fontWeight: "bold" }}>Accounts</Text>
                </Body>
                <Right></Right>
            </Header>
        )
    }

    _renderFooter() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: "orange" }}>
                    <Button onPress={() => {
                        this.props.navigation.navigate('CreateAccount', asyncStorage);
                    }}>
                        <Icon style={{ color: "white" }} name="add" />
                        <Text style={{ color: "white" }}>New Account</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate('TopupTrader', this.props.data.accounts);
                    }}>
                        <Icon name="arrow-round-up" style={{ color: "white" }} />
                        <Text style={{ color: "white" }}>Transaction Trader</Text>
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
            if (this.props.data.accounts === null) {
                return (
                    <Container>
                        {this._renderHeader()}
                        <Content>
                            <Text style={{alignSelf: "center"}}>You dont have account yet</Text>
                        </Content>
                        {this._renderFooter()}
                    </Container>
                )
            } else {
                return (
                    <Container>
                        {this._renderHeader()}
                        <Content>
                            <List>
                                {this.props.data.accounts.map((data, key) => <ListDataAccount key={key} data={data} navigation={this.props.navigation} />)}
                            </List>
                        </Content>
                        {this._renderFooter()}
                    </Container>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchAccounts: () => {
        dispatch(fetchAccounts(asyncStorage))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListAccount);