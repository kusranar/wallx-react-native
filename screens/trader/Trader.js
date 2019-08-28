import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, Text, FooterTab, Button, Icon, ListItem, List } from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { fetchTrader } from '../../redux/actions/Trader';
import { fetchOutstanding } from '../../redux/actions/Outstanding';
import Outstanding from './Outstanding';

var cif = '';
var idTrader = '';

class Trader extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            data: null
        }
    }

    async componentDidMount() {
        cif = await AsyncStorage.getItem("cif");
        idTrader = await AsyncStorage.getItem("idtrader");
        this.props.fetchTrader(cif);
        this.props.fetchOutstanding(idTrader);
        // Axios.get(`http://104.248.147.193:8070/trader?cif=${cif}`)
        //     .then((response) => {
        //         console.log(response);
        //         this.setState({ data: response.data.data });
        //     }).catch((error) => {
        //         alert(error);
        //     })
    }

    _renderOutstanding() {
        return (
            <List>
                <ListItem itemDivider>
                    <Text>Outstanding</Text>
                </ListItem>
                {this.props.data.outstandings.reverse().map((outstanding, key) => <Outstanding outstanding={outstanding} key={key}></Outstanding>
                )}
            </List>

        )
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
                    <Text style={{ color: "white", fontWeight: "bold" }}>Trader</Text>
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
                        this.props.navigation.navigate('CreateTrader');
                    }}>
                        <Icon name="arrow-round-down" style={{ color: "white" }} />
                        <Text style={{ color: "white" }}>Create Trader</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    render() {
        if (this.props.data.trader == null || this.props.data.trader.length == 0) {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Text style={{ alignSelf: "center" }}>You dont have trader yet</Text>
                    </Content>
                    {this._renderFooter()}
                </Container>
            )
        } else {
            return (
                <Container>
                    {this._renderHeader()}
                    <Content>
                        <Image source={require('./../../assets/images/2.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        <ListItem itemDivider>
                            <Text>Name</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.trader.nameTrader}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Balance</Text>
                        </ListItem>
                        <ListItem>
                            <Text>IDR {this.props.data.trader.balance}</Text>
                        </ListItem>
                        {this._renderOutstanding()}
                    </Content>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrader: () => {
        dispatch(fetchTrader(cif));
    },
    fetchOutstanding: () => {
        dispatch(fetchOutstanding(idTrader));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Trader);