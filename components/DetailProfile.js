import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, Left, Body, Right, View, Text, List, ListItem, Icon, Button } from 'native-base';

import { connect } from 'react-redux';
import { fetchCustomer } from './../redux/actions/Customer';

import AsyncStorage from '@react-native-community/async-storage';

var cif = '';

class DetailProfile extends React.Component {
    static navigationOptions = {
        header: null
    }

    async componentDidMount(){
        cif = await AsyncStorage.getItem("cif");
        this.props.fetchCustomer(cif);
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
                    <Body><Text style={{color: "white"}}>Profile Detail</Text></Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>CIF</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.cif}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>ID Card</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.idCard}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Birthdate</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.birthDate.slice(0, 10)}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Gender</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.gender}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Name</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.firstName}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Address</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.address}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Mother</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.mother}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Phone</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.phone}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Occupation</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.occupation}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Salary</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.props.data.customer.salary}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    fetchCustomer: () => {
        dispatch(fetchCustomer(cif));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailProfile);