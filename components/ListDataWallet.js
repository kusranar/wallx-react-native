import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Body, Right, View, Text, Icon, ListItem } from 'native-base';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

const options = [
    'Cancel',
    <Text>Edit Wallet</Text>
]

export default class ListWallet extends React.Component{
    render(){
        return(
            <ListItem>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('DetailWallet', this.props.data);
                }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text>{this.props.data.account.cashtag}</Text>
                        <Text note >{this.props.data.walletType.description}</Text>
                    </View>
                </TouchableOpacity>
                <Body></Body>
                <Right>
                    <TouchableOpacity
                        onPress={() =>
                            this.ActionSheet.show()
                        }>
                        <Icon name="more" />
                    </TouchableOpacity>
                </Right>
                <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={4}
                        onPress={(index) => { 
                            if(index == '1') {
                                this.props.navigation.navigate('EditWallet', this.props.data);
                            }
                        }}
                />
            </ListItem>
        )
    }
}