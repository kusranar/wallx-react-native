import React from 'react';
import { Container, Header, Content, Left, Body, Right, Text, Form, Item, Label, Input, Button, Icon, Toast } from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchTrader } from '../../redux/actions/Trader';
import { connect } from 'react-redux';
import Trader from './../../models/Trader';
import { createToken } from './../../auth/Auth';

var asyncStorage = '';

class CreateTrader extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        this.state = {
            name: null
        }
    }

    async componentDidMount(){
        asyncStorage = await AsyncStorage.getItem("cif");
    }

    _createTrader(){
        if(this.state.name){
            Axios.post(`http://104.248.147.193:8070/trader`, new Trader('', this.state.name, 0, {idStatusType: 1}, {cif: asyncStorage}))
            .then( async (response) => {
                if(response.data.code == '01'){
                    Toast.show({
                        text: "Create Trader Success!",
                        buttonText: "Okay",
                        type: "success"
                    })
                    await createToken('idtrader', response.data.data.idTrader);
                    this.props.dispatch(fetchTrader(asyncStorage));
                    this.props.navigation.goBack();
                } else {
                    Toast.show({
                        text: response.data.data.description,
                        buttonText: "Okay",
                        type: "danger"
                    })
                }
            })
        } else {
            Toast.show({
                text: 'Please Fill Form Correctly!',
                buttonText: "Okay",
                type: "danger"
            })
        }
        
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "orange" }}>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Icon style={{ fontSize: 20, marginLeft: 5, color: "white" }} type="FontAwesome" name="chevron-left" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Create Trader</Text>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form style={{ marginRight: 15 }}>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(value) => {
                                this.setState({ name: value })
                            }} />
                        </Item>
                        <Button
                            full
                            style={{ marginLeft: 15, marginTop: 15, backgroundColor: "orange" }}
                            onPress={ () => {
                                this._createTrader();
                            }}>
                            <Text>Create Trader</Text>
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
)(CreateTrader);