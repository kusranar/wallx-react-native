import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Tab, List, ListItem, Left, Body, Right, Text } from 'native-base';

import { connect } from 'react-redux';
import { fetchCurrencies } from '../../redux/actions/Currencies';
import AsyncStorage from '@react-native-community/async-storage';

var idTrader = '';

export default class CurrencyHistory extends React.Component {
    // componentDidMount(){
    //     this.props.fetchCurrencies();
    // }

    render() {
        return (
            <ListItem avatar>
                <Left>
                </Left>
                <Body>
                    <Text>{this.props.currency.date.slice(0, 10)}</Text>
                </Body>
                <Right>
                    <Text note>Buy IDR<Text>{this.props.currency.buy}</Text></Text>
                    <Text note>Sell IDR<Text>{this.props.currency.sell}</Text></Text>
                </Right>
            </ListItem>
        )
    }
}

// const mapStateToProps = (state) => ({
//     data: state
// });

// const mapDispatchToProps = (dispatch) => ({
//     fetchCurrencies: () => {
//         dispatch(fetchCurrencies())
//     }
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CurrencyHistory);
