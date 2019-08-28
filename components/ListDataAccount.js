import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Left, Body, Right, ListItem, Thumbnail, Text, Icon, View } from 'native-base';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { NavigationActions, StackActions } from 'react-navigation';

const options = [
    'Cancel',
    <Text>Transaction Report</Text>,
    <Text>Transfer</Text>
]

export default class ListData extends Component {

    constructor() {
        super();
        this.state = {
            clicked: null
        }
    }

    render() {
        return (
            <ListItem>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('DetailAccount', this.props.data);
                }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <Text>{this.props.data.cashtag}</Text>
                        <Text note >IDR {this.props.data.balance}</Text>
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
                            if(index == '2') {
                                this.props.navigation.navigate('TransferAccount', this.props.data);
                            } else if(index == '1'){
                                this.props.navigation.navigate('TrasactionReport', this.props.data);
                            }
                        }}
                />
            </ListItem>

            // <ListItem thumbnail>
            //     <Left>
            //         <Thumbnail source={{ uri: this.props.hero.imageUri }}></Thumbnail>
            //     </Left>
            //     <Body>
            //         <Text>{this.props.hero.name}</Text>
            //         <Text note numberOfLines={1}>{this.props.hero.title}</Text>
            //     </Body>
            //     <Right>
            //         <TouchableOpacity onPress={() => this.props.navigation.navigate('HeroView', this.props.hero)}>
            //             <Text>View</Text>
            //         </TouchableOpacity>
            //     </Right>
            // </ListItem>
        )
    }
}