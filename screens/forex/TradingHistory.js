import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Tab, List, ListItem, Left, Body, Right, Text } from 'native-base';

import { connect } from 'react-redux';
import { fetchTradings } from '../../redux/actions/Trading';
import AsyncStorage from '@react-native-community/async-storage';

var idTrader = '';

export default class TradingHistory extends React.Component {

    async componentDidMount() {
        // idTrader = await AsyncStorage.getItem("idtrader");
        // this.props.fetchTradings(idTrader);
    }

    render() {
        return (
            // <Tab tabStyle={{ backgroundColor: "#FF8C00", margin: 1 }} activeTabStyle={{ backgroundColor: "white", margin: 1 }} textStyle={{ color: "white" }} activeTextStyle={{ color: "black" }} heading="Trading History">
            //     <List>
            //         {this.props.data.transactionsf.map((transactionf, key) =>
            //             // <TradingHistory transactionf={transactionf} key={key} navigation={this.props.navigation}></TradingHistory>
            //             <ListItem avatar>
            //                 <Left style={{ justifyContent: "center", alignContent: "center" }}>
            //                     <Text>{transactionf.buySell}</Text>
            //                 </Left>
            //                 <Body>
            //                     <TouchableOpacity
            //                         onPress={() => {
            //                             this.props.navigation.navigate('DetailTrading', transactionf);
            //                         }}>
            //                         <Text>{transactionf.date.slice(0, 10)}</Text>
            //                         <Text note>Point Lose <Text>{transactionf.pointLose}</Text></Text>
            //                     </TouchableOpacity>
            //                 </Body>
            //                 <Right>
            //                     <Text note>A <Text>{transactionf.amount}$</Text></Text>
            //                     <Text note>ASS <Text>{transactionf.amountAfterSell}$</Text></Text>
            //                 </Right>
            //             </ListItem>
            //         )}
            //     </List>
            // </Tab>
            <ListItem avatar>
                <Left style={{ justifyContent: "center", alignContent: "center" }}>
                    <Text>{this.props.trading.buySell}</Text>
                </Left>
                <Body>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DetailTrading', this.props.trading);
                        }}>
                        <Text>{this.props.trading.date.slice(0, 10)}</Text>
                        <Text note>Point Lose <Text>{this.props.trading.pointLose}</Text></Text>
                    </TouchableOpacity>
                </Body>
                <Right>
                    <Text note>A <Text>{this.props.trading.amount}$</Text></Text>
                    <Text note>ASS <Text>{this.props.trading.amountAfterSell}$</Text></Text>
                </Right>
            </ListItem>
        )
    }
}

// const mapStateToProps = (state) => ({
//     data: state
// });

// const mapDispatchToProps = (dispatch) => ({
//     fetchTradings: () => {
//         dispatch(fetchTradings(idTrader))
//     }
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(TradingHistory);
